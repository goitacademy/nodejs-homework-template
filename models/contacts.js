const fs = require("fs/promises");
const path = require("path");
const contactPath = path.join(__dirname, "contacts.json");
const uuid = require("uuid");
const uniqueId = uuid.v4();

//==================================listContacts==========================================
const listContacts = async () => {
  const allContacts = await fs.readFile(contactPath);
  return JSON.parse(allContacts);
};
//===================================getContactById=========================================
const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  return allContacts.find((contact) => contact.id === contactId) || null;
};

//===================================removeContact=========================================
const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  return result;
};

//===================================addContact=========================================
const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: uniqueId,
    ...body,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
};

//===================================updateContact=========================================
const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  allContacts[index] = { contactId, ...body };
  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
