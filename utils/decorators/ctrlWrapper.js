// const HttpError = require("../helpers/HttpError");

const ctrlWrapeer = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = { ctrlWrapeer };
