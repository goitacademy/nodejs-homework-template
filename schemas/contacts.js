const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().min(10).max(15).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .required(),

  favorite: Joi.boolean(),
  id: Joi.string(),
});
module.exports = addShema;
