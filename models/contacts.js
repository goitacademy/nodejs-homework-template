const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (id) => {
  const data = await listContacts();
  const fetchContact = data.find((c) => c.id === id);
  if (!fetchContact) return null;
  return fetchContact;
}

const removeContact = async (id) => {
  const data = await listContacts();
  const index = data.findIndex((c) => c.id === id);
  if (index === -1) return null;
  const [contactToRemove] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return contactToRemove;
}

const addContact = async ({name, email, phone}) => {
  const data = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
}

const updateContact = async (id, {name, email, phone}) => {
  const data = await listContacts();
  const index = data.findIndex((c) => c.id === id);
  if (index === -1) return null;
  const contact = data[index]
  name = name || contact.name
  email = email || contact.email
  phone = phone || contact.phone
  const newContact = { id, name , email , phone };
  data.splice(index, 1, newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
