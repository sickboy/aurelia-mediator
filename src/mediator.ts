import {inject} from 'aurelia-framework';
import {Container} from 'aurelia-dependency-injection';
//import {getLogger} from 'aurelia-logging';

export interface IRequest<T> {
  handle(mediator: IMediator): Promise<T>;
}
export interface IQuery<T> extends IRequest<T> {}
export interface ICommand<T> extends IRequest<T> {}
export interface IVoidCommand extends ICommand<void> {}

export class Request<T> implements IRequest<T> {
  handle(mediator: IMediator): Promise<T> {
    return mediator.request(this);
  }
}
export class Query<T> extends Request<T> implements IQuery<T> {}
export class Command<T> extends Request<T> implements ICommand<T> {}
export class VoidCommand extends Command<void> implements IVoidCommand {}

export interface IMediator {
  request<T>(request: IRequest<T>): Promise<T>;
}

export class Mediator implements IMediator {
  static registry = {};

  // TODO: find out why we must specify <T> even when we constrain to IRequest<T> :S
  request<T>(request: IRequest<T>): Promise<T> {
    if (Mediator.registry[(<any>request).constructor]) {
      var handler = Container.instance.get(Mediator.registry[(<any>request).constructor]);
      return handler.handle(request);
    }
    throw "no handler registered for this request";
  }
}

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
    if (!target.$inject) { throw "$inject missing!"; }

    //Tk.Debug.log("$$$ deco", target, command, target.$name, command.$name, target.inject);
    if (target.handlerFor != null) {
      logError("Target already has a handler assigned: ", target, target.handlerFor);
    }
    target.handlerFor = command;
    registerExternalCommand(target.handlerFor, target);
  };
}
