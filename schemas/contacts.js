const Joi = require("joi");

const addSchema = Joi.object()
  .keys({
    name: Joi.string().label("name").alphanum(),
    email: Joi.string().label("email").email(),
    phone: Joi.string().label("phone"),
  })
  .length(3)
  .and("name", "email", "phone")
  .messages({
    "object.length": "missing  fields ",
    "object.and": "missing required {#missingWithLabels} field ",
  });

module.exports = {
  addSchema,
};
