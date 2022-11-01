const { Contact } = require("../db/contactModel");

const getListContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId);
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
  });
  return await contact.save();
};

const updateContact = async (contactId, { name, email, phone }) => {
  await Contact.findByIdAndUpdate(contactId, {
    $set: {
      name,
      email,
      phone,
      //   favorite
    },
  });
  return await Contact.findById(contactId);
};

const updateStatusContact = async (contactId, { favorite }) => {
  await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });
  return await Contact.findById(contactId);
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
