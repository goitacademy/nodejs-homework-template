import { HttpError } from '../helpers/index.js';

// ============================================================

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);

  console.log(req.path);
  if (!length) {
    if (req.path === '/verify') {
      return next(HttpError(400, 'Missing required field email'));
    } else {
      return next(HttpError(400, 'Missing fields'));
    }
  }
  next();
};

export default isEmptyBody;
