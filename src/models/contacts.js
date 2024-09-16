const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = async (contactId) => {
  const result = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(result);
  const findContact = parsedData.find(
    (item) => item.id === contactId.toString()
  );
  return findContact;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: uid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null), "utf-8");
  return newContact;
};

const updateContact = async (contactId, body) => {
  if (!contactId) {
    return null;
  }

  if (Object.keys(body).length === 0) {
    return null;
  }

  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(contacts);

  const matchedIndex = parsedData.findIndex(
    (contact) => contact.id === contactId
  );

  if (matchedIndex === -1) {
    return undefined;
  }

  parsedData[matchedIndex] = { ...parsedData[matchedIndex], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(parsedData), "utf-8");
  return parsedData[matchedIndex];
};

const removeContact = async (contactId) => {
  if (!contactId) {
    return null;
  }
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const removeIndex = parsedData.findIndex(
    (contact) => contact.id === contactId
  );

  if (removeIndex === -1) {
    return null;
  }

  const removedContact = parsedData[removeIndex];
  parsedData.splice(removeIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(parsedData), "utf-8");

  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
