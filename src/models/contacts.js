const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data);
  });
  return result;
};

const getContactById = async (contactId) => {
  const id = String(contactId);
  const data = await fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data);
  });
  const result = data.find((contact) => contact.id === id);
  return result;
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  const data = await fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data);
  });
  const index = data.findIndex((contact) => contact.id === id);
  const result = index === -1 ? null : data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async (body) => {
  const newContact = { id: nanoid(), ...body };
  const data = await fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data);
  });
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data);
  });
  const foundContact = data.find((contact) => contact.id === contactId);
  const updatedContact = { ...foundContact, ...body };
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  } else {
    data.splice(index, 1);
    data.push(updatedContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return updatedContact;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
