const { Contact } = require("../models/contacts");

const listContactsDB = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

const getByIdDB = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId });
  console.log(contact);
  return contact;
};

const addContactDB = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
};

const removeContactDB = async (contactId) => {
  await Contact.findByIdAndRemove({ _id: contactId });
};

const updateContactDB = async (contactId, { name, email, phone }) => {
  console.log(contactId);
  await Contact.findByIdAndUpdate(
    { _id: contactId },
    { $set: { name, email, phone } }
  );
};

const updateStatusContactDB = async (contactId, { favorite }) => {
  await Contact.findByIdAndUpdate({ _id: contactId }, { $set: { favorite } });
};

module.exports = {
  listContactsDB,
  getByIdDB,
  addContactDB,
  removeContactDB,
  updateContactDB,
  updateStatusContactDB,
};
