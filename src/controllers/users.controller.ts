import { controller, httpPost, interfaces } from 'inversify-express-utils';
import { IUser } from '../models/users.dto';
import { IUserService, UserService } from '../services/users.service';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { inject } from 'inversify';
import { Request } from 'express';
import TYPES from '../bindings/types';

@controller('/user')
export class UsersController implements interfaces.Controller {

  private _userService: IUserService;
  
  constructor(@inject(TYPES.UserService) userService: IUserService) {
    this._userService = userService;
  }

  @httpPost('/userByEmail')
  async getUserByEmail(request: Request) {
    const validEmail = this._userService.isEmailExists(request.body.emailId);
    return validEmail;
  }

  // @Get('/users')
  // async getUsers() {
  //   const findAllUsersData: IUser[] = await this.userService.findAllUser();
  //   return { data: findAllUsersData, message: 'findAll' };
  // }

  // @Get('/users/:id')
  // async getUserById(@Param('id') userId: number) {
  //     const findOneUserData: User = await this.userService.findUserById(userId.toString());
  //     return { data: findOneUserData, message: 'findOne' };
  // }

  // @Post('/users')
  // @HttpCode(201)
  // @UseBefore(validationMiddleware(UserDto, 'body'))
  // async createUser(@Body() userData: UserDto) {
  //   const createUserData: User = await this.userService.createUser(userData);
  //   return { data: createUserData, message: 'created' };
  // }

  // @Put('/users/:id')
  // @UseBefore(validationMiddleware(UserDto, 'body', true))
  // async updateUser(@Param('id') userId: string, @Body() userData: UserDto) {
  //   const updateUserData: User = await this.userService.updateUser(userId, userData);
  //   return { data: updateUserData, message: 'updated' };
  // }

  // @Delete('/users/:id')
  // async deleteUser(@Param('id') userId: string) {
  //   const deleteUserData: User = await this.userService.deleteUser(userId);
  //   return { data: deleteUserData, message: 'deleted' };
  // }
}
