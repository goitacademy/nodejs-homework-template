function asyncErrorHandler(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).send(error.message);
      next(error);
    }
  };
}

module.exports = asyncErrorHandler;
