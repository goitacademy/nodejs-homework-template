const Joi = require("joi");

const updateStatusSchema = Joi.object({ favorite: Joi.boolean().optional() });

module.exports = {
  updateStatusSchema,
};
