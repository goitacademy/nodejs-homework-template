import { Request, Response, NextFunction } from "express";
import { Contact } from "../model";

const updateContact = async (req: Request, res: Response, _: NextFunction) => {
  const { contactId } = req.params;

  await Contact.findByIdAndUpdate(contactId, { $set: { ...req.body } });

  const newContact = await Contact.findById(contactId);

  res.status(200).json({ message: "Contact updated", data: { newContact } });
};

export = updateContact;
