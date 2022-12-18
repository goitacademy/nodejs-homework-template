const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().alphanum().min(3).max(14).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "i", "ua", "org", "gov", "net", "biz", "edu"],
      },
    })
    .required(),
  phone: Joi.number().required(),
});

const patchShema = Joi.object({
  name: Joi.string().alphanum().min(3).max(14),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "net", "i", "ua", "org", "gov", "net", "biz", "edu"],
    },
  }),
  phone: Joi.number(),
});

module.exports = {
  addShema,
  patchShema,
};
