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
        let cstr = request.constructor;
        if (Mediator.registry.has(cstr)) {
            var handler = Container.instance.get(Mediator.registry.get(cstr));
            return handler.handle(request);
        }
        throw "no handler registered for this request";
    }
}
Mediator.registry = new Map();
function logError(...args) {
    if (console && console.error)
        console.error.apply(console, args);
}
export function registerRequest(request, handler) {
    if (request === handler)
        throw new Error("You can't register request === handler");
    //Tk.Debug.log("$$$ register", request, handler);
    if (Mediator.registry.has(request))
        logError("Request already has a handler assigned: ", request, Mediator.registry.get(request));
    Container.instance.registerSingleton(handler);
    request.handler = handler;
    Mediator.registry.set(request, handler);
}
export function handlerFor(request) {
    return target => registerRequest(request, target);
}
//# sourceMappingURL=mediator.js.map