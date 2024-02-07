const Contact = require("../models/contactModel");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

const createContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const upgradeContact = async (id, body) => {
  const updateContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  return updateContact;
};

const upgradeFavorite = async (id, body) => {
  const updateFavorite = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  return updateFavorite;
};

const removeContact = async (id) => {
  const deleteContact = await Contact.findByIdAndDelete(id);
  return deleteContact;
};

module.exports = {
  listContacts,
  getContactById,
  createContact,
  upgradeContact,
  upgradeFavorite,
  removeContact,
};
