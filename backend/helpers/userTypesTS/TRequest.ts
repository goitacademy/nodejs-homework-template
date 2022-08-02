import { TUser } from '../../models/users'

export type TRequest = Request & { user?: TUser };
