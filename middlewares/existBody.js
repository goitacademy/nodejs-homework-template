const { HttpError } = require('../helpers');

const existBody = () => {
  const func = (req, res, next) => {
    const body = req.body;
    if (Object.keys(body).length === 0) {
      next(HttpError(400, 'missing fields'));
    }
    next();
  };
  return func;
};

module.exports = existBody;

// const body = req.body;
// if (Object.keys(body).length === 0) {
//   throw HttpError(400, 'missing fields');
// }
