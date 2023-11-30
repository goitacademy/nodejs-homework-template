const Joi = require('joi');


const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


const UserSignupSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .required(),
    email: Joi.string()
        .pattern(emailRegexp) 
        .required(),
    subscription: Joi.string()
        .valid("starter", "pro", "business") 
        .required(),
});


const UserSigninSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .required(),
    email: Joi.string()
        .pattern(emailRegexp) 
        .required()
});

const validateBody = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: "Validation error", details: error.details });
      }
      next();
    };
  };


module.exports={
    UserSignupSchema,
    UserSigninSchema,
    validateBody
}