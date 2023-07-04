const Joi = require("joi");

const objectStructure = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});
module.exports = {
    objectStructure,
};