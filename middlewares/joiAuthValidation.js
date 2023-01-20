const Joi = require("joi");

const { HttpError } = require("../helpers");

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.allow("starter", "pro", "business")
});
  
const subscriptionSchema = Joi.object({
    subscription: Joi.allow("starter", "pro", "business")
})

const register = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
    next();
}

const subscription = (req, res, next) => {
    const { error } = subscriptionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
    next();
}

module.exports = {
    register,
    subscription
};