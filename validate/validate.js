const Joi = require("joi");

const schemaJoiValidate = (data) => {
  const dataSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().min(5).max(40).email().required(),
    phone: Joi.string().min(8).max(30).required(),
  });

  const result = dataSchema.validate(data);
  return result;
};

module.exports = schemaJoiValidate;
