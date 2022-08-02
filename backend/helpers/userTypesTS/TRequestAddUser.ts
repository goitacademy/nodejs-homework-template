import { TUser } from '../../models/users'
import { Request } from 'express';

export type TRequestAddUser = Request & { user?: TUser };
