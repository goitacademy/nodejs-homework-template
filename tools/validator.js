const joi = require("joi");

const contactSchema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  phone: joi.string(),
});

const validator = (schema) => (body) => {
  return schema.validate(body, { abortEarly: false });
};

const contactValidate = validator(contactSchema);

module.exports = { contactValidate };

//mongodb+srv://user_goit:<password>@cluster0.h3qhf6y.mongodb.net/?retryWrites=true&w=majority
//https://downloads.mongodb.com/compass/mongodb-compass-1.35.0-darwin-arm64.dmg
