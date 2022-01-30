import {Container} from 'inversify';
import TYPES from './types';
import IUserService, { UserService } from '../services/users.service';
import { IUserRepository, UserRepositoryMongo } from '../database/user.repository';
import "../controllers/users.controller";

class Bindings {

  private _bindings: Container;
  constructor() {
    this._bindings = new Container();

    this.bindServices();
  }

  private bindServices() {
    this._bindings.bind<IUserService>(TYPES.UserService).to(UserService);
    this._bindings.bind<IUserRepository>(TYPES.UserRepository).to(UserRepositoryMongo);
  }

  public getBindings() {
    return this._bindings;
  }
}

export default Bindings;
