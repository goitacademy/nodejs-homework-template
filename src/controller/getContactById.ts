import { Request, Response, NextFunction } from "express";
import { Contact } from "../model";

const getContactById = async (req: Request, res: Response, _: NextFunction) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  res.status(200).json({ message: "success", data: { contact } });
};

export = getContactById;
