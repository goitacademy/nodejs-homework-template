
const Joi = require("joi");

const nameRegExp = "^[A-Za-zА-Яа-я]+( [A-Za-zА-Яа-я]+)?$";
const phoneRegExp = "^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$";

// Joi schema for POST
const addSchema = Joi.object({
  name: Joi.string().pattern(RegExp(nameRegExp)).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.string().pattern(RegExp(phoneRegExp)).required(),
  favorite: Joi.boolean(),
}).with("name", ["email", "phone"]);

// Joi schema for PATCH
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
module.exports = { addSchema,schemas};
