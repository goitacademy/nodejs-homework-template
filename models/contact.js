const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
contactSchema.post("save", handleMongooseError);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
