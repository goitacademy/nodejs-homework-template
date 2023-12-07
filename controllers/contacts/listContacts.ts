import { Request, Response } from "express";

import { Contact, IContact } from "../../models/contact/contact";
import { IUser } from "../../models/user/user";

interface QueryParams {
  page?: number;
  limit?: number;
  favorite?: boolean;
}

const listContacts = async (req: Request, res: Response) => {
  const { _id }: IUser = req.user as IUser;
  const { page = 1, limit = 20, favorite }: QueryParams = req.query;
  const skip = (page - 1) * limit;

  let result: IContact[] | null = null;

  if (favorite === true) {
    result = await Contact.find(
      { _id, favorite: true },
      "-createdAt -updatedAt"
    );

    res.json(result);
    return;
  }

  result = await Contact.find({ _id }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

export default listContacts;
