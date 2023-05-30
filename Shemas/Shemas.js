const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const schemaAdd = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().trim().required(),
    favorite: Joi.boolean(),
    }).min(1).required();

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
})

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const updateSubscription = Joi.object({
    subscription: Joi.string()
      .trim()
      .valid('starter', 'pro', 'business')
      .required(),
  });

module.exports = {
    schemaAdd,
    updateFavoriteSchema,
    registerSchema,
    loginSchema,
    updateSubscription,
};