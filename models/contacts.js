// const fs = require('fs/promises')
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const all = await listContacts();
  const contactWithId = all.find((item) => item.id === contactId);
  return contactWithId || null;
};

const removeContact = async (contactId) => {
  const all = await listContacts();
  const removeContactIndex = all.findIndex((item) => item.id === contactId);

  if (removeContactIndex === -1) return null;

  const item = all.splice(removeContactIndex, 1);
  fs.writeFile(contactsPath, JSON.stringify(all, null, 2));
  return item;
};

async function addContact(name, email, phone) {
  const all = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  all.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(all, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const all = await listContacts();
  const index = all.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const updata = {
    ...body,
    id: contactId,
  };
  all.splice(index, 1);
  all.push(updata);
  fs.writeFile(contactsPath, JSON.stringify(all, null, 2));
  return updata;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
