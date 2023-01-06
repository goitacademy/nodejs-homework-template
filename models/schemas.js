const Joi = require("joi");

const putContactSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  email: Joi.string().email({
    minDomainSegments: 3,
  }),
  phone: Joi.string().min(10).max(13),
});

const postContactSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 3,
    })
    .required(),
  phone: Joi.string().min(10).max(13).required(),
});

module.exports = {
  putContactSchema,
  postContactSchema,
};
