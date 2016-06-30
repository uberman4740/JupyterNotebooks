/**
 * @module notebook
 */
define(function (require) {
    "use strict";
    var IPython = require('base/js/namespace');
    var $ = require('jquery');
    var utils = require('base/js/utils');
    var cellmod = require('notebook/js/cell');
    var qf_utils = require('nbextensions/qf_utils');
    var research_logger = require('nbextensions/research_logger');
    var tour_manager = require('nbextensions/tour_manager');
    var sharing_manager = require('nbextensions/sharing_manager');
    var default_notebook = require('notebook/js/default_notebook');

    var QuantoNotebook = function (selector, options) {
        this.share_mgr = null;
        this.tour_mgr = null;
        this.feedback_item_data = null;
        this.selected_cell_index = 0;
        default_notebook.Notebook.call(this, selector, options);

        this.quanto_initialize();
    };

    QuantoNotebook.prototype = Object.create(default_notebook.Notebook.prototype);

    // Quantopian-specific initialization
    QuantoNotebook.prototype.quanto_initialize = function () {
        var self = this;

        this.feedback_item_data = {
            type: 'notebook',
            title: this.notebook_name
        };

        // Set this to null so we don't show the 'give quantopian permission
        // to view this notebook' checkbox in the feedback modal for readonly
        // tutorial notebooks.
        if (this.notebook_path.indexOf('Tutorials and Documentation') === 0){
            this.feedback_item_data = null;
        }

        this.events.on("notebook_renamed.Notebook", function(){
            if (self.feedback_item_data){
                self.feedback_item_data.title = self.notebook_name;
            }
            qf_utils.update_qf_address(self.feedback_item_data);
        });

        this.events.on("execute.CodeCell", function() {
            research_logger.track('cell executed');
        });

        var scroll_bar_width = $("#notebook").outerWidth(true) - $("#notebook-container").outerWidth(true);
        if (scroll_bar_width > 0) {
            $("#notebook").css('padding-left', scroll_bar_width + 'px');
        }

        $("#collapse_b").click($.proxy(this.handle_collapse_clicked, this));

        // Initialize the back button link so it goes back to the folder that
        // the current notebook is contained in.
        qf_utils.initialize_back_button(this.notebook_path);

        // Clicking menu items normally causes the current page's address to be
        // added to the user's browser history additional times.  Calling
        // preventDefault prevents that from happening.
        $("#menubar .dropdown-menu li").click(function(e){
            e.preventDefault();
        });

        // Tell qf that the iframe has navigated to a new address, and log
        // an event in mixpanel.
        qf_utils.update_qf_address(this.feedback_item_data);
        research_logger.track('notebook page loaded');

        // If the current URL contains a "select_cell" query string parameter
        // with a value of true, then the notebook should be presented in
        // "select cell mode".  This is allows a user to select the cell they
        // want to use for the notebook preview (when attaching a notebook to
        // a post via QF).
        var query = window.location.search.substring(1),
            vars = query.split('&'),
            select_cell_mode = false,
            i = 0,
            pair;
        for (i; i < vars.length; i += 1) {
            pair = vars[i].split("=");
            if (pair[0] === 'select_cell' && pair[1] === 'true') {
                select_cell_mode = true;
            }
            if (pair[0] === 'i'){
                // if i is a query string parameter, select the cell with index
                // i as soon as the notebook is loaded.  the i parameter is
                // included by QF when a new post is prepopulated with an
                // attached notebook and cell (via the share button).
                this.selected_cell_index = parseInt(pair[1])
            }
        }

        if (select_cell_mode) {
            this.initialize_select_cell_mode();
        } else {
            this.share_mgr = new sharing_manager.SharingManager(this);
            this.tour_mgr = new tour_manager.TourManager(this);
        }
    };

    QuantoNotebook.prototype.initialize_select_cell_mode = function () {
        var self = this;
        $('.notebook_app').addClass('select-cell-mode');
        cellmod.Cell.prototype.bind_events = function () {
            var cell = this;
            // Append a cell-disabler div to each cell, which extends to the
            // edges of the cell and acts as a transparent layer that prevents
            // any user interaction.
            cell.element.append($("<div class='cell-disabler'></div>"));

            // When the cell-disabler div is clicked, select the underlying
            // cell.  This is how the user chooses the cell they want to use
            // as the notebook preview.
            cell.element.find('.cell-disabler').click(function () {
                if (!this.selected) {
                    cell.events.trigger('select.Cell', {'cell': cell});
                }
            });
        };

        // Tell QF when the notebook is loaded so the user doesn't see the
        // UI before it's fully initialized (and sees a loading spinner in the
        // meantime).
        this.events.on('notebook_loaded.Notebook', function () {
            if (self.selected_cell_index){
                self.select(self.selected_cell_index);
            }
            qf_utils.send_qf_post_message({event: "notebook_loaded"});
        });
        window.addEventListener("message", $.proxy(this.receive_qf_message, this), false);
    };

    QuantoNotebook.prototype.receive_qf_message = function (event) {
        if (qf_utils.check_post_message_origin(event)) {
            // When the user attaches a notebook to a post via QF, QF fires
            // the attach_notebook event to tell research that the user is
            // attempting to submit the post (so it's time to call the
            // nbconvert_upload endpoint and upload the notebook to S3).
            if (event.data.event === 'attach_notebook') {
                var sindex = this.get_selected_index();
                var selected_cell = this.get_cell(sindex);
                var notebook_model;
                selected_cell.metadata.showcase_cell = true;
                // Construct a model for the notebook and make a POST to retrieve
                // the output of nbconvert.
                try {
                    notebook_model = {
                        type : "notebook",
                        content : this.toJSON(),
                        nb_path: this.notebook_path,
                        share_method: "attach_to_post"
                    };
                } finally {
                    // Set the flag back to false in a finally block, so there's no chance
                    // that it gets left behind and permanently saved with the notebook.
                    delete selected_cell.metadata.showcase_cell;
                }

                var url = utils.url_join_encode(
                    this.base_url,
                    'nbconvert_upload'
                );

                $.ajax(url, {
                    type: "POST",
                    data: JSON.stringify(notebook_model),
                    dataType: "html",
                    success: $.proxy(this.handle_upload_success, this),
                    error: $.proxy(this.handle_upload_error, this)
                });
            }
        }
    };

    // If the upload succeeds, send a postMessage back to qf and include the
    // id of the file that was created (so that qf can find the file in S3 and
    // display it with the post).
    QuantoNotebook.prototype.handle_upload_success = function (data) {
        var response_data = JSON.parse(data);
        var qf_data = {
            event: "attach_notebook_succeeded",
            upload_id: response_data.file_id,
            nb_path: this.notebook_path
        };
        qf_utils.send_qf_post_message(qf_data);
    };

    // If the upload fails, send a postMessage back to qf so it can show
    // an error message in the share modal.
    QuantoNotebook.prototype.handle_upload_error = function () {
        qf_utils.send_qf_post_message({event: "attach_notebook_failed"});
    };

    QuantoNotebook.prototype.create_elements = function () {
        var self = this;
        this.element.attr('tabindex', '-1');
        this.container = $('#notebook-container');
        // The default implementation creates the notebook-container and end_space
        // elements in this function but I switched to just including those in the
        // notebook.html.  Still need this click handle for the end_space though.
        $('.end_space').dblclick(function () {
            var ncells = self.ncells();
            self.insert_cell_below('code', ncells - 1);
        });
    };

    QuantoNotebook.prototype.handle_collapse_clicked = function () {
        var app_elem = $("body.notebook_app");
        var collapsing = !app_elem.hasClass("collapsed");

        if (collapsing) {
            app_elem.addClass("collapsed");
        } else {
            app_elem.removeClass("collapsed");
        }

        var msg_data = {
            collapsing: collapsing
        };

        qf_utils.send_qf_post_message(msg_data);

        // Resize the contents of the iframe once QF has had a chance to
        // collapse or expand the header.
        setTimeout(function(){
          $(window).trigger('resize');
        }, 100);
    };

    QuantoNotebook.prototype.copy_notebook = function () {
        var that = this;
        var w = window.open('', IPython._target);
        var parent = utils.url_path_split(this.notebook_path)[0];
        this.contents.copy(this.notebook_path, parent).then(
            function (data) {
                // Here's the line where our implementation differs.  Use qf_base_url
                // to construct the address of the newly opened tab.  The default behavior
                // is to use a relative path, which results in the qf header/footer being missing.
                // w.location = utils.url_join_encode(
                //    base_url, 'notebooks', data.path
                // );
                w.location = qf_utils.qf_base_url + utils.url_join_encode('/notebooks', data.path);
            },
            function (error) {
                w.close();
                that.events.trigger('notebook_copy_failed', error);
            }
        );
    };

    // Copied from the superclass, in case there's any code looking for this
    // class on the IPython object instead of using requirejs.
    IPython.Notebook = QuantoNotebook;

    return {'Notebook': QuantoNotebook};
});
