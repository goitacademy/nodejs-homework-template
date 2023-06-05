const HttpError = require('./HttpError');

const validateReqBody = (req, res, next) => {
  if (!req.body|| Object.keys(req.body).length === 0) {
    return next(HttpError(400, 'Missing fields'));
  }
  next();
};

module.exports = validateReqBody;