const Joi = require("joi");

const addShema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

module.exports = { addShema };
