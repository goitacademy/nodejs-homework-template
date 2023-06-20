const { HttpError } = require("../helpers");
const { registerValidator } = require("../models");

const validateRegister = () => {
  const func = async (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "Missing fields"));
    }

    const { error } = await registerValidator(req.body);

    if (error) {
      next(HttpError(400, "Fields or field not validated"));
    }

    next();
  };

  return func;
};

module.exports = validateRegister;
