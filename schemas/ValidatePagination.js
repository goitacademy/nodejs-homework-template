const Joi = require("joi");

const paginationSchema = Joi.object({
    page: Joi.number(),
    limit: Joi.number(),
})

module.exports = paginationSchema;