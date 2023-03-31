const Joi = require("joi");

class User {
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

const userSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "pl", "uk"] },
    }),
  phone: Joi.number().required().min(9),
});

module.exports = { User, userSchema };
