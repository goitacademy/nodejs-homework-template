const Joi = require("joi");

const putJoiContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
    .optional(),
  favorite: Joi.boolean(),
});

module.export = putJoiContactSchema;
