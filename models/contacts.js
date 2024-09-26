const fs = require("fs/promises");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};
listContacts();

const getContactById = async (id) => {
  const movies = await listContacts();
  const result = movies.find((item) => item.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const contactId = String(id);
  const allNewContacts = await listContacts();
  const index = allNewContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allNewContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allNewContacts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const allNewContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allNewContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allNewContacts, null, 2));

  return newContact;
};

const updateContact = async (id, data) => {
  const contactId = String(id);
  const allNewContacts = await listContacts();
  const index = allNewContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  allNewContacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allNewContacts, null, 2));
  return allNewContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
