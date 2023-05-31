const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contactsData = JSON.parse(await fs.readFile(contactsPath));
  return contactsData;
};

const getContactById = async (contactId) => {
  const contactsData = await listContacts();
  const contact = contactsData.find((item) => item.id === contactId.toString());
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contactsData = await listContacts();
  const idx = contactsData.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contactsData.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsData));
  return removeContact;
};

const addContact = async (body) => {
  console.log(body)
  const contactsData = await listContacts();
  const newContact = { id: randomUUID(), ...body };
  contactsData.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsData));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsData = await listContacts();
  const idx = contactsData.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contactsData[idx] = {  id: contactId, ...contactsData[idx], ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contactsData));
  return contactsData[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};