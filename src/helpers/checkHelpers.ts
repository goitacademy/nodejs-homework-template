import Joi from "joi";
import { Response, NextFunction } from "express";
import { BadRequest } from "http-errors";
import { IContact } from ".";

const isPhoneInContacts = async (
  contacts: Array<IContact>,
  newPhone: string,
  contactId: string
): Promise<boolean> =>
  await contacts.some(
    ({ id, phone }) => phone === newPhone && !id.toString().includes(contactId)
  );

const isEmailInContacts = async (
  contacts: Array<IContact>,
  newEmail: string,
  contactId: string
): Promise<boolean> =>
  await contacts.some(
    ({ id, email }) => email === newEmail && !id.toString().includes(contactId)
  );

const responseErrorOrNext = (
  error: Joi.ValidationError | undefined,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    const { message } = error.details[0];
    next(new BadRequest(message));
  }

  next();
};

export { isPhoneInContacts, isEmailInContacts, responseErrorOrNext };
