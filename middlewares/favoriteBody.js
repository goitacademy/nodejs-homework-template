import { HttpError } from '../helpers/index.js';

const isEmptyFavoriteBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, 'missing field favorite'));
  }
  next();
};
export default isEmptyFavoriteBody;
