export interface IContact {
  readonly _id: string;
  name: string;
  phone: string;
  email: string;
  owner: string;
  favorite: boolean;
}
