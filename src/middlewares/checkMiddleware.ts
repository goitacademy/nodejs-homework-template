import { Request, Response, NextFunction } from "express";
import { BadRequest, NotFound } from "http-errors";
import { Contact } from "../model";
import { isEmailInContacts, isPhoneInContacts } from "../helpers";
import { IContact } from "../helpers";

const checkFieldInContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contacts: Array<IContact> = await Contact.find();
  const { email, phone } = req.body;
  const { contactId } = req.params;

  if (
    (await isEmailInContacts(contacts, email, contactId)) ||
    (await isPhoneInContacts(contacts, phone, contactId))
  ) {
    next(new BadRequest("Contact with same email or phone already exists."));
  }

  next();
};

const checkIdInContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;

  const contacts: Array<IContact> = await Contact.find();
  const searchedIndex = await contacts.findIndex(
    ({ id }) => id.toString() === contactId.toString()
  );

  if (searchedIndex === -1) {
    next(new NotFound("Not found"));
  }

  next();
};

export { checkFieldInContact, checkIdInContact };
