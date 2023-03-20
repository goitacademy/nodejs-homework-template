const Joi = require("joi");

class Contact {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

const userSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().required(),
})

module.exports = { Contact, userSchema };