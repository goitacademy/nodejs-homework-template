const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleSaveError } = require('../helpers');

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

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('seve', handleSaveError);

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
