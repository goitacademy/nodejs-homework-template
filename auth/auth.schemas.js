const Joi = require("joi");

exports.validateSignUpSchema = (req, res, next) => {
  const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    //   subscription: Joi.string().required(),
    //   token: Joi.string().required(),
  });
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};
