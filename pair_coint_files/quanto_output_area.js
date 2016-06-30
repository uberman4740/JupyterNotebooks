define([
    'base/js/namespace',
    'notebook/js/default_outputarea'
], function (IPython, default_outputarea) {
    "use strict";

    // Custom implementation of OutputArea which adds a couple of events that
    // are used by tour_manager.js.
    var QuantoOutputArea = function (options) {
        default_outputarea.OutputArea.call(this, options);
    };

    QuantoOutputArea.prototype = Object.create(default_outputarea.OutputArea.prototype);

    QuantoOutputArea.prototype.append_output = function (json) {
        default_outputarea.OutputArea.prototype.append_output.call(this, json);
        this.events.trigger('append_output.OutputArea', {output_area: this});
    };

    QuantoOutputArea.prototype.clear_output = function (wait, ignore_que) {
        default_outputarea.OutputArea.prototype.clear_output.call(this, wait, ignore_que);
        if (!wait) {
            this.events.trigger('clear_output.OutputArea', {output_area: this});
        }
    };

    // Copied from the superclass, in case there's any code looking for this
    // class on the IPython object instead of using requirejs.
    IPython.OutputArea = QuantoOutputArea;

    return {'OutputArea': QuantoOutputArea};
});
