import { Request, Response } from "express";

import { Contact } from "../../models/contact/contact";

import { HttpError } from "../../helpers";

const getContactById = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default getContactById;
