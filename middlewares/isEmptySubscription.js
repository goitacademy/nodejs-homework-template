import { HttpError } from '../helpers/index.js';

const isEmptySubscription = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    next(HttpError(400, 'missing field subscription'));
  }
  next();
};

export default isEmptySubscription;
