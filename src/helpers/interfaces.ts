export interface IContact {
  readonly _id: string;
  name: string;
  phone: string;
  email: string;
  owner: string;
  favorite: boolean;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IError {
  status: number;
  message: string;
}
