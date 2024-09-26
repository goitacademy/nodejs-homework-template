const Joi = require('joi');


// const sex = ['female', 'male'];

const addSchema = Joi.object({
  name: Joi.string()
      .required()
      .messages({'any.required': `"Name" is required field`,
  }),
  email: Joi.string()
    .email()
    .required()
    .messages({
    'any required': `"Email" is a required field`,
    'string.email': 'Email must be a valid email',
  }),
  phone: Joi.string().required()
    .pattern(
      /^\(\d{3}\)[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
  ),
  favorite: Joi.boolean(),

  //   sex: {enum: sex},
});


const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required()
});

module.exports = {
  addSchema,
  updateFavoriteContactSchema,
};
