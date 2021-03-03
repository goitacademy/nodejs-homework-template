const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      min: 1,
      max: 45,
      unique: true,
    },
    phone: {
      type: String,
      min: 4,
      max: 20,
      unique: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.virtual('strName').get(function () {
  return `${this.phone} phone number`;
});

contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema);

module.exports = Contact;
