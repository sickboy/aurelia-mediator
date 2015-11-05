export interface IRequest<T> {
    handle(mediator: IMediator): Promise<T>;
    isReadOnly: boolean;
}
export interface IQuery<T> extends IRequest<T> {
}
export interface ICommand<T> extends IRequest<T> {
}
export interface IVoidCommand extends ICommand<void> {
}
export interface IRequestHandler<TRequest, TResponse> {
    handle(request: TRequest): Promise<TResponse>;
}
export interface IVoidCommandHandler extends IRequestHandler<IVoidCommand, void> {
}
export declare abstract class Request<T> implements IRequest<T> {
    isReadOnly: boolean;
    handle(mediator: IMediator): Promise<T>;
}
export declare class Query<T> extends Request<T> implements IQuery<T> {
    isReadOnly: boolean;
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
