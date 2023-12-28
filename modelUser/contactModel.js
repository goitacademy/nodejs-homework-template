const { model, Schema } = require("mongoose");

const contactShema = new Schema({
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

const Contact = model("Contact", contactShema);

module.exports = Contact;
