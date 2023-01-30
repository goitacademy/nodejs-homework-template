const { HttpError } = require("../../helpers/error");
const { userSchema } = require("../../schemas/users/userSchema");

const userValidation = (req, res, next) => {
  const validationResult = userSchema.validate(req.body);

  if (validationResult.error) {
    throw HttpError(400, validationResult.error.message);
  }

  next();
};

module.exports = {
  userValidation,
};
