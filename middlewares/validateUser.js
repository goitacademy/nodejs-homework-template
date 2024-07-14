const { HttpError } = require("../helpers");
const { userValidator } = require("../models");

const validateUser = () => {
  const func = async (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "Missing fields"));
    }

    const { error } = await userValidator(req.body);

    if (error) {
      next(HttpError(400, "Email or password not valid"));
    }

    next();
  };

  return func;
};

module.exports = validateUser;