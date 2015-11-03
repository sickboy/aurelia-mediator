declare module "aurelia-mediator" {
  export interface IRequest<T> {
      handle(mediator: IMediator): Promise<T>;
  }
  export interface IQuery<T> extends IRequest<T> {
  }
  export interface ICommand<T> extends IRequest<T> {
  }
  export interface IVoidCommand extends ICommand<void> {
  }
  export class Request<T> implements IRequest<T> {
      handle(mediator: IMediator): Promise<T>;
  }
  export class Query<T> extends Request<T> implements IQuery<T> {
  }
  export class Command<T> extends Request<T> implements ICommand<T> {
  }
  export class VoidCommand extends Command<void> implements IVoidCommand {
  }
  export interface IMediator {
      request<T>(request: IRequest<T>): Promise<T>;
  }
  export class Mediator implements IMediator {
      static registry: {};
      request<T>(request: IRequest<T>): Promise<T>;
  }
  export function handlerFor(request: any): (target: any) => void;
}
