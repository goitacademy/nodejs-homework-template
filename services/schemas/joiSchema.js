const Joi = require("joi");

const joiContactSchema = Joi.object({
 name: Joi.string(),
 email: Joi.string(),
 phone: Joi.string(),
 favorite: Joi.boolean(),
});

module.exports = {
 joiContactSchema,
};
