const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: v => /\S+@\S+\.\S+/.test(v),
        message: props => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
      validate: {
        validator: v => /\(\d{3}\)\s\d{3}-\d{4}/.test(v),
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    subscription: {
      type: String,
      default: 'free',
      enum: ['free', 'pro', 'premium'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false },
);

contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema);

module.exports = Contact;
