const Joi = require("joi");
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    // phone:Joi.string().required(),
    phone: myCustomJoi.string().phoneNumber().required(),
    email: Joi.string().email().required(),
});

module.exports = contactSchema