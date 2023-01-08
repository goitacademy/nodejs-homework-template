const { HttpError } = require("../helpers");

const { verifyEmailSchema } = require("../schemas");

const checkEmail = (req, res, next) => {
  const { error } = verifyEmailSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Bad request");
  }
  next();
};

module.exports = checkEmail;
