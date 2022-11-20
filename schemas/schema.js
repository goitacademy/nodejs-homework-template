const Joi = require("joi");

const addPostSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().alphanum().min(3).max(30).required(),
  favorite: Joi.boolean().optional(),
});

const updatePutSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().alphanum().min(3).max(30).optional(),
  favorite: Joi.boolean().optional(),
})
  .required()
  .min(1);

module.exports = {
  addPostSchema,
  updatePutSchema,
};
