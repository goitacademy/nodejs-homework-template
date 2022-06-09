const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Поле name обязательное",
    "string.empty": "Поле name не может быть пустым",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
});

const schemaMongoId = Joi.object({
  contactId: Joi.objectId().required(),
});

module.exports = { schemaCreateContact, schemaMongoId };
