const joi = require("joi");


const userRegisretSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
});

module.exports = userRegisretSchema;