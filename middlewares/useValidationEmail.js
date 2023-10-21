const { User } = require("../models/user");
const { HttpError } = require("../helpers/HttpError");

const useValidationEmail = async (req, res, next) => {
  const { email } = req.body;

  const result = User.findOne({ email });

  if (!result) {
    throw new HttpError(409, "Email in use");
  }

  next();
};

module.exports = {
  useValidationEmail,
};
