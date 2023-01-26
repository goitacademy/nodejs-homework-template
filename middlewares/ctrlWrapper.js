const errorHelper = require("../helpers/errorHelper");

const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      errorHelper(error);
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
