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
      // required: [true, 'Set email for contact'],
      unique: true, //для уникальности
    },
    phone: {
      type: String,
      // required: [true, 'Set phone for contact'],
    },
    subscription: {
      type: String,
      default: 'free',
    },
    features: {
      type: Array,
      set: data => (!data ? [] : data),
    },
    password: {
      type: String,
      default: 'password',
    },
    token: {},
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactSchema.plugin(mongoosePaginate);

const Contact = model('contact', contactSchema);

module.exports = Contact;
