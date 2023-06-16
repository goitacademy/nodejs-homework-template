const joi = require("joi");

const contactSchema = joi.object({
  name: joi.string().min(3),
  email: joi.string().email(),
  phone: joi.string().min(5),
<<<<<<< HEAD
  favorite: joi.boolean(),
=======
>>>>>>> master
});

const validator = (schema) => (body) => {
  return schema.validate(body);
};

const contactValidator = validator(contactSchema);

module.exports = { contactValidator };
