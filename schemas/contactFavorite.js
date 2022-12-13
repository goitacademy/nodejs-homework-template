const Joi = require("joi");
const contactFavoriteSchema = Joi.object({
  favorite: Joi.bool().required('missing field favorite'),
});

module.exports = contactFavoriteSchema;
