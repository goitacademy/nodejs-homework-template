const Joi = require("joi");

const filterQuerySchema = Joi.object({
    favorite: Joi.bool()
})

module.exports = filterQuerySchema