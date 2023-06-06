const HttpError = require('./HttpError');

const isBodyEmpty = async (req, _, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400));
  }
  next();
};

module.exports = isBodyEmpty;
