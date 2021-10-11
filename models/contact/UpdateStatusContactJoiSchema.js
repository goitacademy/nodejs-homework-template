const Joi = require("joi");

const UpdateStatusContactJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { UpdateStatusContactJoiSchema };
