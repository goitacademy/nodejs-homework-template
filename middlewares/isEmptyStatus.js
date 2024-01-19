import { HttpError } from '../helpers/index.js';

// ============================================================

const isEmptyStatus = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, 'missing field favorite'));
  }
  next();
};

export default isEmptyStatus;
