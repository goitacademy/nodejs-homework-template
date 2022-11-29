const Joi = require("joi");

const updateStatusValid = (body) => {
  const { favorite } = body;

  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const bodyIsValid = schema.validate({
    favorite: favorite,
  });

  return bodyIsValid;
};

const addContactValid = (body) => {
  const { name, email, phone, favorite } = body;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    favorite: Joi.boolean(),
  });

  const bodyIsValid = schema.validate({
    name: name,
    email: email,
    phone: phone,
    favorite: favorite,
  });
  return bodyIsValid;
};

const updateContactValid = (body) => {
  const { name, email, phone } = body;

  const schema = Joi.object()
    .keys({
      name: Joi.string().alphanum().min(3).max(20).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .optional(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .optional(),
    })
    .or("name", "email", "phone")
    .required();

  const bodyIsValid = schema.validate({
    name: name,
    email: email,
    phone: phone,
  });

  return bodyIsValid;
};

const userValid = (body) => {
  const { email, password } = body;

  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(4).required(),
  });

  const bodyIsValid = schema.validate({
    email: email,
    password: password,
  });
  return bodyIsValid;
};

const getFavoriteContactsValid = (body) => {
  const { favorite } = body;

  const schema = Joi.object({
    favorite: Joi.boolean(),
  });

  const bodyIsValid = schema.validate({
    favorite: favorite,
  });

  return bodyIsValid;
};

module.exports = {
  updateStatusValid,
  addContactValid,
  updateContactValid,
  userValid,
  getFavoriteContactsValid,
};
