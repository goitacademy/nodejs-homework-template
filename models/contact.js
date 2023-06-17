const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { emailRegexp, phoneRegexp } = require("../constants");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: emailRegexp,
  },
  phone: {
    type: String,
    match: phoneRegexp,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
