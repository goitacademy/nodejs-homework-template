const Joi = require("joi");
const HttpError = require('../helpers/HttpError');

const regSchema = Joi.object({
    email: Joi.string().required().messages({
        "any.required": `missing required email field`,
        "string.empty": `email cannot be empty`,
        "string.base": `email must be string`,
    }),
    password: Joi.string().required().messages({
        "any.required": `missing required password field`,
        "string.empty": `password cannot be empty`,
        "string.base": `password must be string`,
    }),  
});

const updSubscriptSchema = Joi.object({
    subscription: Joi.any().valid('starter', 'pro', 'business').required(),
}).required();


function validateRegistrationLogin (req, res, next) {

    const {error} = regSchema.validate(req.body);

    if(error) {
      throw HttpError(400, error.message);
    };
  
    next();

};

function validateUpdSubscrip (req, res, next) {

    const {error} = updSubscriptSchema.validate(req.body);

    if(error) {
      throw HttpError(400, error.message);
    };
  
    next();

};


module.exports = {
    validateRegistrationLogin,
    validateUpdSubscrip,
  };