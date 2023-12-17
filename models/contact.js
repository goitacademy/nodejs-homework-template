const { Schema, model } = require('mongoose');
const handleSaveErrors = require('../helpers/handleSaveErrors');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  }
  phone: {
    type: String,
    unique: true,
    required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const Contact = model('contact', contactSchema);

module.exports = { Contact };
