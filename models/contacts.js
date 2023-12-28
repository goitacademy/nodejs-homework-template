const Contact = require("./contactModel");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndDelete(contactId);
};

const addContact = async (value) => {
  const newContact = await Contact.create(value);

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { name, email, phone },
    },
    { new: true }
  );

  return updatedContact;
};

const updateStatusContact = async (contactId, { favorite }) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    favorite,
    { new: true }
  );

  return updatedContact;
};

module.exports = {
  listContacts,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
