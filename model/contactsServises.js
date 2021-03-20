const {
  listContactsRepository,
  getContactByIdRepository,
  removeContactRepository,
  addContactRepository,
  updateContactRepository,
} = require("../repository/contactsRepository");

const listContacts = async () => {
  const data = await listContactsRepository();
  return data;
};

const getContactById = async (id) => {
  const data = await getContactByIdRepository(id);
  return data;
};

const removeContact = async (id) => {
  const data = await removeContactRepository(id);
  return data;
};

const addContact = async (body) => {
  const data = await addContactRepository(body);
  return data;
};

const updateContact = async (id, body) => {
  const data = await updateContactRepository(id, body);
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
