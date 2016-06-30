// Custom implementation of the Notebook's dialog module, which styles dialogs
// so they match the dialogs in QF, and centers them vertically based on
// dimensions provided by QF.
define([
  'jquery',
  "nbextensions/qf_utils",
  'base/js/default_dialog'
], function($, qf_utils, default_dialog) {
    "use strict";

    var cur_modal = null;
    var window_center = null;

    var modal = function (options) {
        options.show = false;
        options.backdrop = true;
        cur_modal = default_dialog.modal(options);

        // Remove the sliding animation and the old close button
        cur_modal.addClass('quanto-modal').removeClass('fade');
        cur_modal.find('.modal-header .close').remove();

        // Turn btn-danger and btn-primary into solid blue buttons
        cur_modal.find('.btn').addClass('new-btn');
        cur_modal.find('.btn-danger, .btn-primary').removeClass('btn-danger btn-primary btn-default')
          .addClass('blue')
          .css('float', 'right')
          .css('margin-left', '10px')

        // Turn btn-default into a light-grey button
        cur_modal.find('.btn-default').removeClass('btn-default')
          .addClass('light-grey')

        // Add the new close button
        $('<div class="modal-x-out"></div>').prependTo(cur_modal.find('.modal-content'));

        bind_events(cur_modal);

        // If there's a modal showing already, hide it first and then show
        // the new modal once the old one is hidden.
        if ($('.quanto-modal.in').length > 0){
          $('.quanto-modal.in').on('hidden.bs.modal', finish_show_modal)
          $('.quanto-modal.in').modal('hide');
        } else {
          send_show_modal_post_message();
        }

        return cur_modal;
    };

    var finish_show_modal = function (e) {
        $(e.target).off('hidden.bs.modal', finish_show_modal)
        send_show_modal_post_message();
    };

    var send_show_modal_post_message = function () {
        // Send a post message to QF.  We only show the modal once QF moves it's
        // header/footer behind the iframe and responds with the dimensions of
        // the screen.
        qf_utils.send_qf_post_message({event: 'show_modal'});
    };

    var bind_events = function(modals){
        modals.on('shown.bs.modal', function(e){
            var $shown_modal = $(e.target);
            var $cur_dialog = $shown_modal.find('.modal-dialog');
            $cur_dialog.css('vertical-align', 'top');
            // Center the dialog on the screen
            $cur_dialog.css('top', window_center - Math.floor($cur_dialog.outerHeight(true) / 2) - 10);
            $shown_modal.css('opacity', '1');

            // Automatically focus on .first-input once the modal is shown
            var first_input = $shown_modal.find('.first-input');
            if (first_input.length > 0) {
              first_input.focus();
              first_input.select();
            }
        });

        modals.on('hidden.bs.modal', function(e) {
            var $hidden_modal = $(e.target);
            var $cur_dialog = $hidden_modal.find('.modal-dialog');
            // Tell QF that the modal has been hidden, so it can bring it's
            // header/footer in front of the iframe again.
            qf_utils.send_qf_post_message({event: 'hide_modal'});
            $hidden_modal.css('opacity', '0');
        });

        modals.find('.modal-x-out').click(function(e) {
            var $clicked_modal = $(e.target).closest('.quanto-modal');
            $clicked_modal.modal('hide');
        });
    };

    var show_custom_modal = function(modal){
        cur_modal = modal;
        qf_utils.send_qf_post_message({event: 'show_modal'});
    };

    var receive_qf_message = function(event){
        if (qf_utils.check_post_message_origin(event)) {
            if (event.data.event == "show_modal" && cur_modal) {
                window_center = event.data.scrollTop + Math.floor(event.data.windowHeight / 2);
                if (cur_modal){
                  cur_modal.modal('show');
                  cur_modal = null;
                }
            }
        }
    };

    window.addEventListener("message", receive_qf_message, false);

    bind_events($('.quanto-modal'));

    $(document).keyup(function(e){
      var cur_modal = $('.quanto-modal.in');
      if (cur_modal.length > 0){
        if (e.keyCode == 13) {
          cur_modal.find('.submit-button').click();
        }
        else if (e.keyCode == 27) {
          cur_modal.modal('hide');
        }
      }
    });

    var dialog = {
        modal : modal,
        bind_events : bind_events,
        show_custom_modal : show_custom_modal,
        kernel_modal : default_dialog.kernel_modal,
        edit_metadata : default_dialog.edit_metadata,
    };

    // Backwards compatability.
    IPython.dialog = dialog;

    return dialog;
});
