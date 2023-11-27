const Joi = require("joi");
const HttpError = require("./HttpError");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function validateUsers(req, res, next) {
  const { email, password } = req.body;
  const { error } = userSchema.validate({ email, password });
  if (error) {
    return next(HttpError(400, "missing required name field"));
  }
  next();
}

module.exports = { validateUsers };
