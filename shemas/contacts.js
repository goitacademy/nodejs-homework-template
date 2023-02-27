// const Joi = require("joi");

// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//     .required(),
//   phone: Joi.string().required(),
// });

// const contactIdSchema = Joi.object({
//   contactId: Joi.string().alphanum().required(),
// });
// module.exports = {
//   contactSchema,
//   contactIdSchema,
// };
const mangoose = reqire('mangoose');
const { Schema, model } = require('mangoose');

const schema = new Schema({
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
});

const Contact = model('Contact', schema);

module.exports = {
  Contact,
};
