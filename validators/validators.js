const Joi = require("joi").extend(require("joi-phone-number"));

const isFavoriteValidator = (favorite) => {
  const favSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  return favSchema.validate(favorite);
};

const newContactValidator = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().phoneNumber().required(),
    favorite: Joi.boolean().required(),
  });

  return schema.validate(contact);
};

const emailValidator = (email) => {
  const emailCheck = Joi.object({
    email: Joi.string().email().required(),
  });

  return emailCheck.validate({ email });
};

module.exports = {
  isFavoriteValidator,
  newContactValidator,
  emailValidator,
};
