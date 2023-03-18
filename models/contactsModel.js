const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema({
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
});

const Contacts = mongoose.model("contact", contact);

const getAllContacts = async () => {
  return Contacts.find();
};

const createContact = async (body) => {
  return Contacts.create(body);
};

const deleteContact = async (id) => {
  return Contacts.findByIdAndDelete(id);
};

const updateContact = async (id, body) => {
  return Contacts.findOneAndUpdate(id, body);
};

module.exports = {
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
};

module.exports = Contacts;
