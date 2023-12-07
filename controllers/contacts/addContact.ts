import { Request, Response } from "express";

import { Contact } from "../../models/contact/contact";
import { IUser } from "../../models/user/user";

const addContact = async (req: Request, res: Response) => {
  const { _id: owner }: IUser = req.user as IUser;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

export default addContact;
