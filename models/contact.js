const { Schema, default: mongoose } = require('mongoose');

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, 'Set name for contact'], }, // String is shorthand for {type: String}
    email: { type: String, },
    phone: { type: String, },
    favorite: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true },
);

const Contact = mongoose.model('contacts', contactSchema);

module.exports = Contact;