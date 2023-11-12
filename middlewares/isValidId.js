import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/HttpError.js';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not a valid id`));
  }
  next();
};
