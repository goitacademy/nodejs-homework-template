export interface IContact {
  readonly _id: string;
  name: string;
  phone: string;
  email: string;
  owner: string;
  favorite: boolean;
}

export interface IUser {
  readonly _id: string;
  email: string;
  password: string;
  subscription: string;
}

export interface IError {
  status: number;
  message: string;
}
