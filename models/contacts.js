const Joi = require("joi");

class Contact {
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

const contactSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

module.exports = { Contact, contactSchema };
