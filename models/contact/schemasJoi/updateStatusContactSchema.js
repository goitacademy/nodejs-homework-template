const Joi = require("joi");

const updateStatusContactSchema = Joi.object()
  .keys({
    favorite: Joi.boolean()
      .required()
      .error((errors) => {
        if (errors[0].code === "any.required") {
          errors[0].message = "Missing field favorite";
        }
        return errors;
      }),
  })
  .unknown(true);

module.exports = updateStatusContactSchema;