// const Joi = require("joi");

// const contactAddSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string(),
//   phone: Joi.string(),
//   favorite: Joi.boolean(),
// });

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// const userEmailSchema = Joi.object({
//   email: Joi.string().required(),
// });
// module.exports = { contactAddSchema, updateFavoriteSchema, userEmailSchema };

const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactAddSchema, emailSchema, updateFavoriteSchema };
