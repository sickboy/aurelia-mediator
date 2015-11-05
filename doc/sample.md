In general you create a command and a handler e.g:

~~~
import {Query, IRequestHandler} from 'aurelia-mediator'
interface IUserProfile {
  id: string;
  userName: string;
  birthday: Date;
}

class GetUserProfile extend Query<IUserProfile> {
  constructor(public userId: string) { super() }
}

@handlerFor(GetUserProfile)
@inject(DbContext)
class GetUserProfileHandler extends IRequestHandler<GetUserProfile, IUserProfile> {
   constructor(private dbContext: DbContext) {}

   async handle(request: GetUserProfile) {
     let result = await this.dbContext.users.firstOrThrow(request.userId);
     return { id: result.id, userName: result.userName, birthday: result.birthday }
   }
}
~~~

and then use it in your viewmodel:

~~~
import {Mediator} from 'aurelia-mediator';
@inject(Mediator)
class UserProfile {
    constructor(private mediator: Mediator) {}

    async activate(params, config) {
      this.model = await new GetUserProfile(params.userId).handle(this.mediator);
    }
}
~~~

You can then do AOP by creating decorators for the Mediator for e.g logging and error handling etc, and also create some base classes for injecting default services like the dbContext etc.
