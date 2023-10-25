const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const { emailRegexp, phoneRegexp } = require('../constants/schemaCommons');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

module.exports = model('contact', contactSchema);
