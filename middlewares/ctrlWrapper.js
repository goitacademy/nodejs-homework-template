const errorHandler = require("../handlers/errorHandler");

const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      errorHandler(error);
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
