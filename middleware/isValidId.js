import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';

// #############################################
const make404 = (id) => HttpError(404, `${id} is not a valid id`);

const isValidId = ({ params: { id } }, res, next) => {
  if (!isValidObjectId(id)) next(make404(id));
  next();
};

export default isValidId;
