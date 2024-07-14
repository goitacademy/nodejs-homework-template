const { HttpError } = require("../helpers");
const { emailValidator } = require("../models");

const validateEmail = () => {
  const func = async (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "Missing required field email"));
    }

    const { error } = await emailValidator(req.body);

    if (error) {
      next(HttpError(400, "Email not valid"));
    }

    next();
  };

  return func;
};

module.exports = validateEmail;