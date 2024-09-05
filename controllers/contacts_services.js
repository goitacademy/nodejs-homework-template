const { Contacts } = require("../models/Contacts");
const listContacts = async () => {
  return Contacts.find({});
};

const getContactById = (contactId) => {
  return Contacts.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  const contact = await Contacts.findOneAndDelete({ _id: contactId });
  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

const addContact = (body) => {
  const { name, email, phone } = body;
  return Contacts.create({ name, email, phone });
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contact = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { $set: { name, email, phone } },
    { new: true, runValidators: true, strict: "throw" }
  );
  return contact;
};

const updatedStatusContact = async (contactId, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { $set: body },
    { new: true }
  );
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updatedStatusContact,
};
