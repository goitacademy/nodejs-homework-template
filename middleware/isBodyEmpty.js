import { HttpError } from '../helpers/index.js';

const isBodyEmpty = (req, res, next) => {
  const { length } = Object.keys(req.body);

  if (!length) next(HttpError(400, 'Request cannot be empty'));

  next();
};

export default isBodyEmpty;
