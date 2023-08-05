const { HttpError } = require('../helpers');

const checkBody = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, 'Missing fields'));
  }
  next();
};

module.exports = checkBody;
