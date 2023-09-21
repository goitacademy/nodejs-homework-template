const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[A-Za-zА-Яа-я]+( [A-Za-zА-Яа-я]+)?$"))
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{3}-[0-9]{2}-[0-9]{2}$"))
    .required(),
}).with("name", ["email", "phone"]);

module.exports = schema;
