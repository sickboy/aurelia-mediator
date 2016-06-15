import {inject} from 'aurelia-framework';
import {Container} from 'aurelia-dependency-injection';
//import {getLogger} from 'aurelia-logging';

export interface IRequest<T> {
  handle(mediator: IMediator): Promise<T>;
  isReadOnly: boolean;
}
export interface IQuery<T> extends IRequest<T> { }
export interface ICommand<T> extends IRequest<T> { }
export interface IVoidCommand extends ICommand<void> { }

export interface IRequestHandler<TRequest, TResponse> {
  handle(request: TRequest): Promise<TResponse>;
}

export interface IVoidCommandHandler extends IRequestHandler<IVoidCommand, void> { }

export abstract class Request<T> implements IRequest<T> {
  isReadOnly = false;
  handle(mediator: IMediator): Promise<T> { return mediator.request(this); }
}
export class Query<T> extends Request<T> implements IQuery<T> {
  isReadOnly = true;
}
export class Command<T> extends Request<T> implements ICommand<T> { }
export class VoidCommand extends Command<void> implements IVoidCommand { }

export interface IMediator {
  request<T>(request: IRequest<T>): Promise<T>;
}

export class Mediator implements IMediator {
  static registry = new Map<any, any>();

  // TODO: find out why we must specify <T> even when we constrain to IRequest<T> :S
  request<T>(request: IRequest<T>): Promise<T> {
    let cstr = (<any>request).constructor;
    if (Mediator.registry.has(cstr)) {
      var handler = Container.instance.get(Mediator.registry.get(cstr));
      return handler.handle(request);
    }
    throw new Error("no handler registered for this request");
  }
}

function logError(...args) {
  if (console && console.error)
    console.error.apply(console, args);
}

export function registerRequest(request, handler) {
  if (request === handler) throw new Error("You can't register request === handler");
  //Tk.Debug.log("$$$ register", request, handler);
  if (Mediator.registry.has(request)) logError("Request already has a handler assigned: ", request, Mediator.registry.get(request));
  Container.instance.registerSingleton(handler);
  request.handler = handler;
  Mediator.registry.set(request, handler);
}

export function handlerFor(request) {
  return target => registerRequest(request, target);
}
