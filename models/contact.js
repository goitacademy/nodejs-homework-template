const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const { emailRegexp, nameRegexp, phoneRegexp } = require("../constans/contacts");

const contactShema = new Schema({
  name: {
    type: String,
    match: nameRegexp,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    match:emailRegexp,
  },
  phone: {
    type: String,
    match:phoneRegexp,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
  
}, { versionKey: false, timestamps: true });

contactShema.post("save", handleMongooseError);

const Contact = model("contact", contactShema);

module.exports = Contact;