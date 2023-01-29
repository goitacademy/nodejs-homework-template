const joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const { DB_HOST, NODE_ENV } = process.env;
const isDevMode = NODE_ENV === 'development';

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

const addContactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const updateContactSchema = joi
  .object({
    name: joi.string().optional(),
    email: joi.string().optional(),
    phone: joi.string().optional(),
  })
  .or('name', 'email', 'phone');

async function connectToContactsDB() {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(DB_HOST);
    isDevMode && console.log(`Successfully connected to DB`);
  } catch (error) {
    isDevMode &&
      console.log(`Can't connect to DB. Aborting process...\nError: ${error}`);
    return 1;
  }

  return 0;
}

const ContactModel = mongoose.model('contacts', contactScheme);
const joiSchemas = { addContactSchema, updateContactSchema };

module.exports = {
  connectToContactsDB,
  ContactModel,
  contactScheme,
  joiSchemas,
};
