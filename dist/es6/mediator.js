import { Container } from 'aurelia-dependency-injection';
export class Request {
    constructor() {
        this.isReadOnly = false;
    }
    handle(mediator) { return mediator.request(this); }
}
export class Query extends Request {
    constructor(...args) {
        super(...args);
        this.isReadOnly = true;
    }
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
export function registerRequest(request, handler) {
    //Tk.Debug.log("$$$ register", request, handler);
    Container.instance.registerSingleton(handler);
    request.handler = handler;
    if (Mediator.registry[request])
        logError("Request already has a handler assigned: ", request, Mediator.registry[request]);
    Mediator.registry[request] = handler;
}
export function handlerFor(request) {
    return target => registerRequest(request, target);
}
//# sourceMappingURL=mediator.js.map