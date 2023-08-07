import { HttpError } from '../helpers/index.js';

const isBodyEmpty = (req, res, next) => {
  const errorMessage = req.route.methods.patch
    ? 'Missing field "Favorite"'
    : 'Request is empty';

  const { length } = Object.keys(req.body);
  if (!length) next(HttpError(400, errorMessage));
  next();
};

export default isBodyEmpty;
