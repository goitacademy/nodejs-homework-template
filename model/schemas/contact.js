const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, 'Set phone for contact'],
      unique: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
    password: {},
    token: {},
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema);

module.exports = Contact;
