const Joi = require("joi");
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const contactSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: myCustomJoi.string().phoneNumber().require(),
    email: Joi.string().email().require(),
});

module.exports = contactSchema