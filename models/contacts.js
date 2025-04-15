const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const updatedContacts = data.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return data[idx];
};

const addContact = async (body) => {
  const result = await listContacts();
  const addedContact = { ...body, id: v4() };
  result.push(addedContact);
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return addedContact;
};

const updateContact = async (contactId, body) => {
  const result = await listContacts();
  const idx = result.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  result[idx] = { ...body, id: contactId };
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return result[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
