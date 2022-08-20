const { NotAuthorized } = require("../helpers/errors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotAuthorized)
    res.status(err.status).json({ message: err.message });

  const errorMidlware = (midleware) => {
    return async (req, res, next) => {
      try {
        await midleware(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  };
};

const errorMidlware = (midleware) => {
  return async (req, res, next) => {
    try {
      await midleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  errorHandler,
  errorMidlware,
};
