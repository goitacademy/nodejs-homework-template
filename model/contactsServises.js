const {
  listContactsRepository,
  getContactByIdRepository,
  removeContactRepository,
  addContactRepository,
  updateContactRepository,
} = require("../repository/contactsRepository");

const listContacts = () => {
  const data = listContactsRepository();
  return data;
};

const getContactById = (id) => {
  const data = getContactByIdRepository(id);
  return data;
};

const removeContact = (id) => {
  const data = removeContactRepository(id);
  return data;
};

const addContact = (body) => {
  const data = addContactRepository(body);
  return data;
};

const updateContact = (id, body) => {
  const data = updateContactRepository(id, body);
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
