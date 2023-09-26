const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const readContactJson = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(readContactJson);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const getContact = contacts.find((contact) => contact.id === contactId);
  return getContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = await contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  // Перевірка, чи не існує контакту з таким же ім'ям або іншим унікальним полем
  // const existingContact = contacts.find(
  //   (contact) => contact.name === body.name
  // );

  // if (existingContact) {
  //   throw new Error("Контакт з таким ім'ям вже існує.");
  // }

  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
