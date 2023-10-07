import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log('first', contactId);
  if (!isValidObjectId(contactId)) {
    return next(HttpError(404, 'Not found'));
  }
  next();
};
export default isValidId;
