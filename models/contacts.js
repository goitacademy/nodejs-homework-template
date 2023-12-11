const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  let allContacts = await listContacts();
  const deletedContacts = allContacts.find(
    (contact) => contact.id === contactId
  );
  if (deletedContacts === -1) {
    return null;
  }
  allContacts = allContacts.filter((contacts) => contacts.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContacts || null;
};

const addContact = async (body) => {
  const newContact = {
    id: uuid(),
    ...body,
  };

  const allContacts = await listContacts(contactsPath);

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();

  const contactsIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  // If contact with the specified contactId is not found, return null or handle it accordingly
  if (contactsIndex === -1) {
    return null; // Contact not found
  }
  // const updatedContact = { ...allContacts[contactsIndex], ...body };
  allContacts[contactsIndex] = { ...allContacts[contactsIndex], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[contactsIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
