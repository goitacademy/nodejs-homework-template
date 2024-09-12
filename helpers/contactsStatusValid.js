const Joi = require("joi");

const contactsStatusValid = (data) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  return schema.validate(data)
};

module.exports = contactsStatusValid;
