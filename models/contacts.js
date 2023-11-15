const { Schema, model } = require("mongoose");
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
contactSchema.statics.listContacts = async function () {
  try {
    const contacts = await this.find();
    return contacts;
  } catch (error) {
    throw new Error("Error fetching contacts");
  }
};

const Contact = model("contact", contactSchema);
module.exports = Contact;
