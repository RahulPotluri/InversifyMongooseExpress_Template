import { injectable } from 'inversify';
import userModel, { IUser } from '../models/users.dto';
import Repository from './repository';

export interface IUserRepository {
  isUsernameExists(username: string): Promise<boolean>;
  isEmailExists(username: string): Promise<boolean>;
}

@injectable()
export class UserRepositoryMongo extends Repository<IUser> implements IUserRepository {
  private readonly user: IUser;

  constructor() {
    super(userModel);
  }

  isUsernameExists(username: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async isEmailExists(username: string): Promise<boolean> {
    const result: IUser[] = await this.find({email: username},1,0);
    return (result.length>0)?true:false;
  }
}
