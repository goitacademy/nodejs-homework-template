const contacts = require("./contacts.json");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return false;
  contacts.splice(index, 1);
  return true;
};

const addContact = async (body) => {
  contacts.push(body);
};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...body };
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
const Contact = models?.Contact || model("contacts", ContactSchema);

module.exports = { Contact };
