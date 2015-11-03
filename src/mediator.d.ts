export interface IRequest<T> {
    handle(mediator: IMediator): Promise<T>;
}
export interface IQuery<T> extends IRequest<T> {
}
export interface ICommand<T> extends IRequest<T> {
}
export interface IVoidCommand extends ICommand<void> {
}
export declare class Request<T> implements IRequest<T> {
    handle(mediator: IMediator): Promise<T>;
}
export declare class Query<T> extends Request<T> implements IQuery<T> {
}
export declare class Command<T> extends Request<T> implements ICommand<T> {
}
export declare class VoidCommand extends Command<void> implements IVoidCommand {
}
export interface IMediator {
    request<T>(request: IRequest<T>): Promise<T>;
}
export declare class Mediator implements IMediator {
    static registry: {};
    request<T>(request: IRequest<T>): Promise<T>;
}
export declare function handlerFor(request: any): (target: any) => void;
