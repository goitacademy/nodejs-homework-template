const fs = require("fs/promises");
const pathContacts = require("path");
const crypto = require("crypto");

const contactPath = pathContacts.join(__dirname, "..", "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath, "utf8");
  return JSON.parse(data);
};

const getById = async (id) => {
  const data = await listContacts();
  const find = data.find((contact) => contact.id === id);

  return find || null;
};

const addContact = async (body) => {
  const data = await listContacts();
  const contact = {
    id: crypto.randomUUID(),
    ...body,
  };

  data.push(contact);
  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));

  return contact;
};

const updateContact = async (id, body) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((contactId) => contactId.id === id);

  if (contactIndex === -1) return;

  data[contactIndex] = {
    ...data[contactIndex],
    ...body,
  };

  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));

  return data[contactIndex];
};

const removeContact = async (id) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((contactId) => contactId.id === id);

  if (contactIndex === -1) {
    return { message: "Not contact found with this identifier!" };
  }

  data.splice(contactIndex, 1);

  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));
  return contactIndex || null;
};

module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
};
