const { NotFound } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");
const contacts = require("./contacts.json");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((item) => item.id === Number(contactId));
  if (!contact) {
    throw new NotFound("Not found");
  }
  return contact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === Number(contactId));
  console.log(`contactIndex`, contactIndex);
  if (contactIndex === -1) {
    throw new NotFound("Not found");
  }
  data.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data));

  return data;
};

const addContact = async (body) => {
  const data = await listContacts();
  const id = data.length ? data[data.length - 1].id + 1 : 1;
  if (body === {}) {
    throw new NotFound("Not found");
  }
  const newContact = { id, ...body };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === Number(contactId));
  const updatedContact = { ...data[contactIndex], ...body };
  data[contactIndex] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(data));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
