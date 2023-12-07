import { Request, Response } from "express";

import { Contact } from "../../models/contact/contact";
import { HttpError } from "../../helpers";

const removeContact = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

export default removeContact;
