import Joi from "joi";
import { Response, NextFunction } from "express";
import { BadRequest } from "http-errors";
import { IContact, IUser } from ".";

const isPhoneInContacts = async (
  contacts: Array<IContact>,
  newPhone: string,
  contactId: string
): Promise<boolean> =>
  await contacts.some(
    ({ _id, phone }) =>
      phone === newPhone && !_id.toString().includes(contactId)
  );

const isEmailInContacts = async (
  contacts: Array<IContact>,
  newEmail: string,
  contactId: string
): Promise<boolean> =>
  await contacts.some(
    ({ _id, email }) =>
      email === newEmail && !_id.toString().includes(contactId)
  );

const isEmailInUsers = async (
  users: Array<IUser>,
  newEmail: string
): Promise<boolean> => await users.some(({ email }) => email === newEmail);

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

export {
  isPhoneInContacts,
  isEmailInContacts,
  responseErrorOrNext,
  isEmailInUsers,
};
