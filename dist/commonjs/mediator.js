"use strict";

exports.__esModule = true;
exports.handlerFor = handlerFor;

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var Request = (function () {
    function Request() {
        _classCallCheck(this, Request);

        this.isReadOnly = false;
    }

    Request.prototype.handle = function handle(mediator) {
        return mediator.request(this);
    };

    return Request;
})();

exports.Request = Request;

var Query = (function (_Request) {
    _inherits(Query, _Request);

    function Query() {
        _classCallCheck(this, Query);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _Request.call.apply(_Request, [this].concat(args));
        this.isReadOnly = true;
    }

    return Query;
})(Request);

exports.Query = Query;

var Command = (function (_Request2) {
    _inherits(Command, _Request2);

    function Command() {
        _classCallCheck(this, Command);

        _Request2.apply(this, arguments);
    }

    return Command;
})(Request);

exports.Command = Command;

var VoidCommand = (function (_Command) {
    _inherits(VoidCommand, _Command);

    function VoidCommand() {
        _classCallCheck(this, VoidCommand);

        _Command.apply(this, arguments);
    }

    return VoidCommand;
})(Command);

exports.VoidCommand = VoidCommand;

var Mediator = (function () {
    function Mediator() {
        _classCallCheck(this, Mediator);
    }

    Mediator.prototype.request = function request(_request) {
        if (Mediator.registry[_request.constructor]) {
            var handler = _aureliaDependencyInjection.Container.instance.get(Mediator.registry[_request.constructor]);
            return handler.handle(_request);
        }
        throw "no handler registered for this request";
    };

    return Mediator;
})();

exports.Mediator = Mediator;

Mediator.registry = {};
function logError() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    if (console && console.error) console.error.apply(console, args);
}
function registerExternalCommand(command, handler) {
    _aureliaDependencyInjection.Container.instance.registerSingleton(handler);
    if (Mediator.registry[command]) {
        logError("Command already has a handler assigned: ", command, Mediator.registry[command]);
    }
    Mediator.registry[command] = handler;
}

function handlerFor(request) {
    return function (target) {
        var command = request;
        if (target.inject) target.$inject = target.inject;
        if (!target.$inject) {
            throw "$inject missing!";
        }

        if (target.handlerFor != null) {
            logError("Target already has a handler assigned: ", target, target.handlerFor);
        }
        target.handlerFor = command;
        registerExternalCommand(target.handlerFor, target);
    };
}