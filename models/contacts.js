const Contact = require('./contact');

// Lista wszystkich kontaktów użytkownika
const listContacts = async (owner) => {
  return await Contact.find({ owner });
};

// Pobranie kontaktu po ID (dla konkretnego użytkownika)
const getContactById = async (contactId, owner) => {
  return await Contact.findOne({ _id: contactId, owner });
};

// Dodanie nowego kontaktu
const addContact = async (body, owner) => {
  return await Contact.create({ ...body, owner });
};

// Aktualizacja kontaktu
const updateContact = async (contactId, body, owner) => {
  return await Contact.findOneAndUpdate({ _id: contactId, owner }, body, { new: true });
};

// Usuwanie kontaktu
const removeContact = async (contactId, owner) => {
  return await Contact.findOneAndDelete({ _id: contactId, owner });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
