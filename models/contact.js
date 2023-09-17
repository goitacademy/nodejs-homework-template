const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');
const { regexpList } = require('../variables');

/**
 * Schema for the Contact model.
 */
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: [regexpList.email, 'Email must be valid'],
    },
    phone: {
      type: String,
      match: [regexpList.phone, 'Phone must be valid'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Set owner for contact'],
    },
  },
  { versionKey: false, timestamps: true }
);

// Handle Mongoose save errors using a post middleware
contactSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'contact' collection using the contactSchema.
 */
const Contact = model('contact', contactSchema);

module.exports = Contact;

// This code defines a Mongoose schema for the Contact model, specifying the schema fields, data types, and validation rules. It also includes a post middleware to handle Mongoose save errors using the handleMongooseError function from the helpers module.

// The Contact model is created using the model function, and it is exported for use in other parts of your application. This model represents the "contact" collection in your MongoDB database and can be used to interact with contact data.
