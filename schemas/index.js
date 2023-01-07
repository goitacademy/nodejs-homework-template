const Joi = require("joi");

const addMoviesSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().integer().required(),
});

module.exports = {
  addMoviesSchema,
};
