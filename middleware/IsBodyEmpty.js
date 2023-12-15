const { HttpError } = require('../helpers');

const isBodyEmpty = (req, _, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, 'missing fields'));
  }
  next();
};

module.exports = isBodyEmpty;
