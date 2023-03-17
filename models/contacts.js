const service = require("../service/index");

const listContacts = async () => {
  return await service.getAllContacts();
};

const addContact = async (body) => {
  return await service.createContact(body);
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const searchedElement = list.find(
    (el) => el.id.toString() === contactId.toString()
  );
  return searchedElement;
};

const removeContact = async (contactId) => {
  await service.deleteContact(contactId);
};

const updateContact = async (contactId, body) => {
  return await service.updateContact(contactId, body);
};

const updateFavorite = async (contactId, body) => {
  return await service.updateContact(contactId, body);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
