const fs = require('node:fs/promises');
const path = require('node:path');

const crypto = require('node:crypto');

const contactsPath = path.join(__dirname, 'contacts.json');

// Функція, що повторюється - запис данних в файл patern "Don't repeat your self!"
async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
// Функція, що повторюється - зчитування данних з файлу
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [res] = contacts.splice(index, 1); // const [res] - деструктурізація елементу масиву

  await writeContacts(contacts);

  return res; // повертає вирізаний об'єкт
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body }; 
  await writeContacts(contacts);
  return contacts[index]; // повертає оновлений об'єкт
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
