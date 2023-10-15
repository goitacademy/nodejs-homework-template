const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().min(1).required(),
  favorite: Joi.boolean().optional(),
});

const userValidationMiddleware = (req, res, next) => {
  const newUser = req.body;

  const { error } = userSchema.validate(newUser);

  if (error) {
    return res.status(400).send({ error: error.message });
  }

  return next();
};

module.exports = {
  userValidationMiddleware,
};
