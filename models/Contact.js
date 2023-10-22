const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const { emailRegexp, phoneRegexp } = require('../helpers/commonRegexp');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: emailRegexp,
    },
    phone: {
      type: String,
      require: true,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

module.exports = model('contact', contactSchema);
