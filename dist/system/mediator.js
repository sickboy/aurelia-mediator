System.register(["aurelia-dependency-injection"], function (_export) {
    "use strict";

    var Container, Request, Query, Command, VoidCommand, Mediator;

    _export("handlerFor", handlerFor);

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function logError() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (console && console.error) console.error.apply(console, args);
    }
    function registerExternalCommand(command, handler) {
        Container.instance.registerSingleton(handler);
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

    return {
        setters: [function (_aureliaDependencyInjection) {
            Container = _aureliaDependencyInjection.Container;
        }],
        execute: function () {
            Request = (function () {
                function Request() {
                    _classCallCheck(this, Request);
                }

                Request.prototype.handle = function handle(mediator) {
                    return mediator.request(this);
                };

                return Request;
            })();

            _export("Request", Request);

            Query = (function (_Request) {
                _inherits(Query, _Request);

                function Query() {
                    _classCallCheck(this, Query);

                    _Request.apply(this, arguments);
                }

                return Query;
            })(Request);

            _export("Query", Query);

            Command = (function (_Request2) {
                _inherits(Command, _Request2);

                function Command() {
                    _classCallCheck(this, Command);

                    _Request2.apply(this, arguments);
                }

                return Command;
            })(Request);

            _export("Command", Command);

            VoidCommand = (function (_Command) {
                _inherits(VoidCommand, _Command);

                function VoidCommand() {
                    _classCallCheck(this, VoidCommand);

                    _Command.apply(this, arguments);
                }

                return VoidCommand;
            })(Command);

            _export("VoidCommand", VoidCommand);

            Mediator = (function () {
                function Mediator() {
                    _classCallCheck(this, Mediator);
                }

                Mediator.prototype.request = function request(_request) {
                    if (Mediator.registry[_request.constructor]) {
                        var handler = Container.instance.get(Mediator.registry[_request.constructor]);
                        return handler.handle(_request);
                    }
                    throw "no handler registered for this request";
                };

                return Mediator;
            })();

            _export("Mediator", Mediator);

            Mediator.registry = {};
        }
    };
});