const tryCatchWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      if (error.message.includes("Cast to ObjectId failed for value")) {
        error.status = 404;
        return next(error);
      }
      if (error.message.includes("duplicate key error collection")) {
        error.status = 409;
        error.message = "Email in use";
        return next(error);
      }
    }
  };
};

module.exports = tryCatchWrapper;
