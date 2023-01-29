const { Schema } = require('mongoose');

const contactScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// const addContactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// const updateContactSchema = Joi.object({
//   name: Joi.string().optional(),
//   email: Joi.string().optional(),
//   phone: Joi.string().optional(),
// }).or('name', 'email', 'phone');

module.exports = {
  contactScheme,
  // addContactSchema,
  // updateContactSchema,
};
