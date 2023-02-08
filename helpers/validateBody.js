const Joi = require("joi");

async function validatePost(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const validate = await schema.validate(data);

  return validate;
}

async function validatePut(data) {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const validate = await schema.validate(data);

  return validate;
}

module.exports = {
  validatePost,
  validatePut,
};
