import { Container } from 'aurelia-dependency-injection';
export class Request {
    handle(mediator) {
        return mediator.request(this);
    }
}
export class Query extends Request {
}
export class Command extends Request {
}
export class VoidCommand extends Command {
}
export class Mediator {
    // TODO: find out why we must specify <T> even when we constrain to IRequest<T> :S
    request(request) {
        if (Mediator.registry[request.constructor]) {
            var handler = Container.instance.get(Mediator.registry[request.constructor]);
            return handler.handle(request);
        }
        throw "no handler registered for this request";
    }
}
Mediator.registry = {};
function logError(...args) {
    if (console && console.error)
        console.error.apply(console, args);
}
function registerExternalCommand(command, handler) {
    Container.instance.registerSingleton(handler);
    if (Mediator.registry[command]) {
        logError("Command already has a handler assigned: ", command, Mediator.registry[command]);
    }
    Mediator.registry[command] = handler;
}
// has to come before inject, so that is executed after :S!
export function handlerFor(request) {
    return function (target) {
        var command = request;
        if (target.inject)
            target.$inject = target.inject;
        if (!target.$inject) {
            throw "$inject missing!";
        }
        //Tk.Debug.log("$$$ deco", target, command, target.$name, command.$name, target.inject);
        if (target.handlerFor != null) {
            logError("Target already has a handler assigned: ", target, target.handlerFor);
        }
        target.handlerFor = command;
        registerExternalCommand(target.handlerFor, target);
    };
}
//# sourceMappingURL=mediator.js.map