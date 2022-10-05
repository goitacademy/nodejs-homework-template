const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\+)?((\D) ?\d|\d)(([ -]?\d)|( ?(\D) ?)){5,12}\d$/)
    .required(),
});

module.exports = {
  addShema,
};
