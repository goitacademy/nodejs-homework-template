const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactsList = JSON.parse(await fs.readFile(contactsPath));

  return contactsList;
};

const getContactById = async (contactId) => {
  let contactsList = null;
  await listContacts().then((result) => {
    contactsList = result;
  });
  const contact = contactsList.find((item) => item.id == contactId);
  return contact;
};

const removeContact = async (contactId) => {
  let contactsList = null;
  await listContacts().then((result) => {
    contactsList = result;
  });
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) return null;
  contactsList.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return contactsList;
};

const addContact = async ({ name, email, phone }) => {
  let contactsList = null;
  await listContacts().then((result) => {
    contactsList = result;
  });
  const contact = { id: uuidv4(), name, email, phone };
  contactsList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  console.log(contact);
  return contactsList;
};

const updateContact = async (contactId, body) => {
  let contactsList = null;
  await listContacts().then((result) => {
    contactsList = result;
  });
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) return "fals";
  contactsList[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contactsList;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
