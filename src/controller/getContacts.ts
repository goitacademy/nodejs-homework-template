import { Request, Response, NextFunction } from "express";
import { Contact } from "../model";

const getContacts = async (__: Request, res: Response, _: NextFunction) => {
  const contacts = await Contact.find();

  res.status(200).json({ message: "success", data: { contacts } });
};

export = getContacts;
