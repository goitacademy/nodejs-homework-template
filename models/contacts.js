const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ContactSchema = new Schema({
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

const ContacModel = mongoose.model("Contact", ContactSchema, "contacts");

const listContacts = async () => {
  const data = await ContacModel.find({});
  return data;
};

const getContactById = async (contactId) => {
  const data = await ContacModel.findById(contactId);
  return data;
};

const removeContact = async (contactId) => {
  const data = await ContacModel.deleteOne({ _id: contactId });
  return data;
};

const addContact = async (body) => {
  const contact = new ContacModel(body);
  const data = await contact.save();
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await ContacModel.findOneAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return data;
};

const toggleFavoriteContact = async (contactId) => {
  const contact = await ContacModel.findById(contactId);
  const data = await ContacModel.findOneAndUpdate(
    { _id: contactId },
    { favorite: !contact.favorite },
    { new: true }
  );
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  toggleFavoriteContact,
};
