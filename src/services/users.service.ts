import { hash } from 'bcrypt';
import TYPES from '../bindings/types';
import { IUserRepository } from '../database/user.repository';
import { inject, injectable } from 'inversify';
import { IUser } from 'models/users.dto';
import { HttpException } from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';

export interface IUserService {
  isEmailExists(email: string): Promise<boolean>;
  // findAllUser(): Promise<Array<IUser>>;
  // findUserById(userId: string): Promise<IUser>;
  // createUser(user: IUser): Promise<IUser>;
  // updateUser(userId: string, user: IUser): Promise<IUser>;
  // deleteUser(userId: string);
}

@injectable()
export class UserService implements IUserService {
  
  private _userRepository;

  constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository) {
    this._userRepository = userRepository;
  } 

  public async isEmailExists(email: string): Promise<boolean> {
    return await this._userRepository.isEmailExists(email);
  }

  // public async findAllUser(): Promise<IUser[]> {
  //   const users: IUser[] = await this.userRepository.find();
  //   return users;
  // }

  // public async findUserById(userId: string): Promise<IUser> {
  //   if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

  //   const findUser: IUser = await this.users.findOne({ _id: userId });
  //   if (!findUser) throw new HttpException(409, "You're not user");

  //   return findUser;
  // }

  // public async createUser(userData: UserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const findUser: User = await this.users.findOne({ email: userData.email });
  //   if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

  //   const hashedPassword = await hash(userData.password, 10);
  //   const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

  //   return createUserData;
  // }

  // public async updateUser(userId: string, userData: UserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   if (userData.email) {
  //     const findUser: User = await this.users.findOne({ email: userData.email });
  //     if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
  //   }

  //   if (userData.password) {
  //     const hashedPassword = await hash(userData.password, 10);
  //     userData = { ...userData, password: hashedPassword };
  //   }

  //   const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
  //   if (!updateUserById) throw new HttpException(409, "You're not user");

  //   return updateUserById;
  // }

  // public async deleteUser(userId: string): Promise<User> {
  //   const deleteUserById: User = await this.users.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(409, "You're not user");

  //   return deleteUserById;
  // }
}

export default IUserService;
