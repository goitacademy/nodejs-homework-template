import { Request, Response, NextFunction } from "express";
import { BadRequest, NotFound } from "http-errors";
import { Contact } from "../model";
import {
  isEmailInContacts,
  isPhoneInContacts,
  IContact,
  ID_LENGTH,
} from "../helpers";

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
    return next(
      new BadRequest("Contact with same email or phone already exists.")
    );
  }

  next();
};

const checkIdInContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;

  if (contactId.length !== ID_LENGTH) {
    return next(new BadRequest("Contact's ID length must be equal to 24"));
  }

  const searchedContact: IContact = await Contact.findById(contactId);

  if (searchedContact === null) {
    return next(new NotFound("Not found"));
  }

  next();
};

export { checkFieldInContact, checkIdInContact };
