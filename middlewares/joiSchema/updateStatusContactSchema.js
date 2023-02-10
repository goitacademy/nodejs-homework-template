const Joi = require("joi");

const updateStatusContactSchema = Joi.object({
    name: Joi.string().min(3),
    phone: Joi.string()
      .max(15)
      .pattern(
        /\(?([0-9]{3})\) \/?([0-9]{3})-?([0-9]{4})/,
        "For example (000) 000-0000"
      ),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),
    favorite: Joi.boolean().required(),
});

module.exports = {updateStatusContactSchema};