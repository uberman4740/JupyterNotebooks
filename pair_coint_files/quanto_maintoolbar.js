define([
    'base/js/namespace',
    'jquery',
    'notebook/js/default_maintoolbar'
], function (IPython, $, default_maintoolbar) {
    "use strict";

    var QuantoMainToolBar = function (selector, options) {
        default_maintoolbar.MainToolBar.call(this, selector, options);
        this.quanto_initialize();
    };

    QuantoMainToolBar.prototype = Object.create(default_maintoolbar.MainToolBar.prototype);

    QuantoMainToolBar.prototype.quanto_initialize = function(){
        // Disable the whole run_int button group until the kernel is ready
        var run_group_btns = $("#run_int .btn");
        run_group_btns.addClass("disabled");
        this.events.on("kernel_ready.Kernel", function() {
            console.log("Kernel ready, enabling play button.");
            run_group_btns.removeClass("disabled");
        });

        // Prepend a Cell Type label to the dropdown in the toolbar
        var wrapper = $('<div/>').addClass('btn-group');
        var label = $('<span/>').addClass("navbar-text").text('Cell Type:');
        wrapper.append(label);
        var cell_type = $('#cell_type');
        cell_type.before(wrapper);
        cell_type.detach();
        wrapper.append(cell_type);
    };

    // Copied from the superclass, in case there's any code looking for this
    // class on the IPython object instead of using requirejs.
    IPython.MainToolBar = QuantoMainToolBar;

    return {'MainToolBar': QuantoMainToolBar};
});
