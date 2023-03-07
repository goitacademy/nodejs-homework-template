const {Schema, model} = require('mongoose');

const contactSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Set name for contact"],
        minlength: 2,
        maxlength: 20,
      },
      email: {
        type: String,
        minlength: 2,
        maxlength: 15,
        unique: true,
        required: [true, "Email is required"],
      },
      phone: {
        type: String,
        minlength: 2,
        maxlength: 10,
        required: [true, "Phone is required"],
        unique: true,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
    },
    { versionKey: false, timestamps: true }
);

const Contact = model('contact', contactSchema)

module.exports = Contact;