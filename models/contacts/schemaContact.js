const { Schema, model } = require('mongoose');
const { regexName, regexEmail, regexPhone } = require('../../helpers/regex');
const {
  CONTACT_NAME_LIMIT,
  CONTACT_EMAIL_LIMIT,
  CONTACT_PHONE_LIMIT,
} = require('../../helpers/constants');

const validateName = name => regexName.test(name);
const validateEmail = email => regexEmail.test(email);
const validatePhone = phone => regexPhone.test(phone);

const contactMongooseSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: CONTACT_NAME_LIMIT.MIN,
      maxlength: CONTACT_NAME_LIMIT.MAX,
      required: [true, 'Name is required'],
      validate: [validateName, 'Please fill a valid name'],
      match: [regexName, 'Please fill a valid name'],
    },
    email: {
      type: String,
      index: true,
      trim: true,
      lowercase: true,
      minlength: CONTACT_EMAIL_LIMIT.MIN,
      maxlength: CONTACT_EMAIL_LIMIT.MAX,
      required: [true, 'Email is required'],
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [regexEmail, 'Please fill a valid email address'],
      unique: true,
    },
    phone: {
      type: String,
      minlength: CONTACT_PHONE_LIMIT.MIN,
      maxlength: CONTACT_PHONE_LIMIT.MAX,
      required: [true, 'Phone is required'],
      validate: [validatePhone, 'Please fill a valid phone number'],
      match: [regexPhone, 'Please fill a valid phone number'],
    },
    favorite: {
      type: Boolean,
      required: [false, "Favorite isn't required"],
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Owner is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = model('contact', contactMongooseSchema);

module.exports = Contact;
