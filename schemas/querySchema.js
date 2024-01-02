const Joi = require("joi");
const { constants } = require("../vars");

const querySchema = Joi.object({
    favorite: Joi.boolean(),
    sort: Joi.string(),
    order: Joi.string().valid(...constants.sortOrder),
    search: Joi.string(),
    field: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),
});

module.exports = querySchema