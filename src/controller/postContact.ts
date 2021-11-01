import { Request, Response, NextFunction } from "express";
import { Contact } from "../model";

const postContact = async (req: Request, res: Response, _: NextFunction) => {
  const newContact = new Contact({ ...req.body });

  newContact.save();

  res.status(201).json({ message: "Contact added", data: { newContact } });
};

export = postContact;
