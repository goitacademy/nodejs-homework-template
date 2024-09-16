const { Contact } = require("../models/contact");

const listContacts = async (fieldsForQuery, options) => {
  // Повертає масив контактів
  return await Contact.find({ ...fieldsForQuery }, "", { ...options });
};

const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  return await Contact.findByIdAndRemove(contactId);
};

const addContact = async (data) => {
  // Повертає об'єкт доданого контакту.
  return await Contact.create(data);
};

const updateContact = async (contactId, data) => {
  // Повертає об'єкт оновленого контакту.
  return await Contact.findByIdAndUpdate(contactId, data, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
