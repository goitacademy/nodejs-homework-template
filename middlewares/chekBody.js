const HttpError = require('../helpers');

const checkBody = (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    throw HttpError(400, 'missing field');
  }
  next();
};

module.exports = checkBody;