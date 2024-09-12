const { Contact } = require("../db/contactModel");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId);
  return contactById;
};

const deleteContact = async (contactId) => {
  const deletedContact = Contact.findByIdAndRemove(contactId);
  return deletedContact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const newContact = await new Contact({ name, email, phone, favorite });
  await newContact.save();
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

const updateStatus = async (contactId, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    { new: true }
  );
  return updatedContact;
};

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatus,
};
