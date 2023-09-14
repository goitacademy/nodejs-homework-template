const { Schema, model } = require("mongoose");
const {handlerMongooseError} = require("../helpers")

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true,});

const Contact = model("contact", contactSchema);

contactSchema.post("save", handlerMongooseError);

module.exports = Contact;
