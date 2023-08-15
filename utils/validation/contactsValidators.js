const Joi = require("joi");

const schemaCreateContact = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string().min(3).max(12).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string()
      .regex(/^(\d*|\+*|-*| *|\(*|\)*)*$/)
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      })
      .required(),
    favorite: Joi.boolean().default(false),
  });

const schemaUpdateContact = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string().min(3).max(12),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().regex(/^(\d*|\+*|-*| *|\(*|\)*)*$/),
    favorite: Joi.bool(),
  })
  .min(1);

const schemaUpdateStatusContact = Joi.object()
  .options({ abortEarly: false })
  .keys({
    favorite: Joi.bool()
      .required()
      .messages({ "any.required": "missing field favorite" }),
  });

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    next({
      status: err.status || 400,
      message: err.message.replace(/"/g, "'"),
    });
  }
};

module.exports = {
  createContactValidator: async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next);
  },
  updateContactValidator: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next);
  },
  updateStatusContactValidator: async (req, res, next) => {
    return await validate(schemaUpdateStatusContact, req.body, next);
  },
};
