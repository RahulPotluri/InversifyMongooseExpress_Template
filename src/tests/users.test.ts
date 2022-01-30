import request from 'supertest';
import bcrypt from 'bcrypt';
import App from '../app';
import { UsersController } from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import UserService from '../services/users.service';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response statusCode 200 / findAll', () => {

      const mockUsersFindAllUsers = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          email: 'a@email.com',
          password: bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'alskdjfhg',
          email: 'b@email.com',
          password: bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          _id: 'zmxncbv',
          email: 'c@email.com',
          password: bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);
      
      jest.mock('../services/users.service', () => {
        return jest.fn().mockImplementation(() => {
          return {findAllUser: mockUsersFindAllUsers};
        });
      });
      
      const userService = new UserService();
      
      const findUser: Promise<User[]> = userService.findAllUser();

      const app = new App([UsersController]);
      
      return request(app.getServer()).get('/users').expect(200, { data: findUser, message: 'findAll' });
    });
  }
  
  );

  // describe('[GET] /users/:id', () => {
  //   it('response statusCode 200 / findOne', () => {
  //     const userId = 1;
  //     const findUser: User = userModel.find(user => user. === userId);

  //     const app = new App([UsersController]);
  //     return request(app.getServer()).get(`/users/${userId}`).expect(200, { data: findUser, message: 'findOne' });
  //   });
  // });

  describe('[POST] /users', () => {
    it('response statusCode 201 / created', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };

      const app = new App([UsersController]);
      return request(app.getServer()).post('/users').send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const userId = 1;
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };

      const app = new App([UsersController]);
      return request(app.getServer()).put(`/users/${userId}`).send(userData).expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response statusCode 200 / deleted', () => {
      const userId = 1;

      const app = new App([UsersController]);
      return request(app.getServer()).delete(`/users/${userId}`).expect(200);
    });
  });
});
