const Joi = require("joi");

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string(),
    email: Joi.string(),
    subscription: Joi.string().valid("starter", "business", "pro"),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
      data: "Bad Request",
    });
  }
  next();
};

const validateUserUserSubscription = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid("starter", "business", "pro"),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
      data: "Bad Request",
    });
  }
  next();
};

module.exports = { validateUser, validateUserUserSubscription };
