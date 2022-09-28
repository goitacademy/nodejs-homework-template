const { Schema, model } = require('mongoose');

const Joi = require('joi');

/**
 * regular expression for checking data that goes to database if we need
 */
// const someRegex = ....

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      //   required: true,
    },

    phone: {
      type: String,
      //   required: true,
      // match: someRegex,
      //   unique: true,
    },

    favorite: {
      type: Boolean,
      default: false,
      //   required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// this foo it is medelware for validate
// const handleSaveError = (error, data, next) => {
//   //   const { name, code } = error;
//   //  error.status = (name === "")...
//   console.log(error);
//   console.log(data);
//   next();
// };
// contactSchema.post('seve', handleSaveError);

/** like type script typing data */
const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactsUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  contactsAddSchema,
  contactsUpdateSchema,
};
