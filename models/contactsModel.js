const { model, Schema } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,

    unique: [true, "Duplicated email.."],
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
    ref: "user",
  },
});
const ContactModel = model("contact", contactSchema);

module.exports = ContactModel;
