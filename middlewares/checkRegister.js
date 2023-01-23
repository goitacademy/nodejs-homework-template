const { HttpError } = require("../helpers");

const { registerSchema } = require("../schemas");

const checkRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Bad request");
  }
  next();
};

module.exports = checkRegister;
