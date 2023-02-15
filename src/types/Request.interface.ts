import { Request } from 'express';
import { UserType } from './User.type';

export interface IRequest extends Request {
  user?: Partial<UserType>;
}
