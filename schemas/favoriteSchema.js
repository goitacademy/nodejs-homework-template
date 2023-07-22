const Joi = require("joi");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing required field favorite" }),
});
module.exports = { favoriteSchema };
