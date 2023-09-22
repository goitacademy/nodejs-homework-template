const Joi = require("joi");

const paginationSchema = Joi.object({
  page: Joi.number().min(1).max(999),
  limit: Joi.number().min(1).max(20),
});

module.exports = paginationSchema;