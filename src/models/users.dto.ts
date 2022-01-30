import { IsEmail, IsString, IsDate, IsNumber } from 'class-validator';
import { model, Schema, Document } from 'mongoose';


export interface IUser{
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role? : number;
  dateOfBirth?: Date;
  createDate?: Date;
  deletedAt?: Date;
  updatedDate?: Date;
}

export class User implements IUser {
  
  public _id: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsNumber()
  role?: number;

  @IsDate()
  dateOfBirth?: Date;

  @IsDate()
  deletedAt?: Date;

  @IsDate()
  createDate?: Date;

  @IsDate()
  updatedDate?: Date;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  createDate: {
    type: Date,
    default: new Date(1900,1,1)
  },
  updatedDate: {
    type: Date,
    default: new Date(1900,1,1)
  },
  deletedDate: {
    type: Date,
    default: new Date(1900,1,1)
  },
});

const userModel = model<IUser>('User', userSchema);

export default userModel;




