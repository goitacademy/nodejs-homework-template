const { Contact } = require("../models/contactModel");

const listContacts = async () => {
  const docs = await Contact.find().exec();
  return docs;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactById = contacts.filter((contact) => contact.id === contactId);
  if (!contactById.length) {
    return null;
  }
  return contactById[0];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((element) => element.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = await Contact.findOneAndDelete(contactId);
  return deletedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const user = await Contact.create({ name, email, phone });
  console.log(user);
  return user;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const updatedUser = await Contact.findByIdAndUpdate(contactId, {
    name,
    email,
    phone,
  });

  return updatedUser;
};

const updateStatusContact = async (contactId, favorite) => {
  const contacts = await listContacts();
  const contactById = contacts.filter((contact) => contact.id === contactId);
  if (!contactById.length) {
    return null;
  }
  const changeFavorite = await Contact.findByIdAndUpdate(contactId, favorite, {
    new: true,
  });
  return changeFavorite;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
