define([
    'base/js/namespace',
    'notebook/js/default_codecell'
], function (IPython, default_codecell) {
    "use strict";

    var QuantoCodeCell = function (kernel, options) {
        default_codecell.CodeCell.call(this, kernel, options);
    };

    // Properties of the parent class that aren't on the prototype can't be
    // inherited, so they have to be copied over manually.
    QuantoCodeCell.options_default = default_codecell.CodeCell.options_default;
    QuantoCodeCell.config_defaults = QuantoCodeCell.options_default;

    QuantoCodeCell.prototype = Object.create(default_codecell.CodeCell.prototype);

    QuantoCodeCell.prototype._handle_execute_reply = function(msg) {
        default_codecell.CodeCell.prototype._handle_execute_reply.call(this, msg);
        this.events.trigger('execute_reply.CodeCell', {code_cell: this});
    };

    // Copied from the superclass, in case there's any code looking for this
    // class on the IPython object instead of using requirejs.
    IPython.CodeCell = QuantoCodeCell;

    return {'CodeCell': QuantoCodeCell};
});
