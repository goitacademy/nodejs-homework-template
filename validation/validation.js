const Joi = require("joi");

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const postSchema = Joi.object({
  name: Joi.string()
    .pattern(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/)
    .required(),
});

const putSchema = Joi.object({
  name: Joi.string().pattern(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(/^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/),
}).or("name", "email", "phone");

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  postSchema,
  putSchema,
  registerSchema,
  loginSchema,
};
