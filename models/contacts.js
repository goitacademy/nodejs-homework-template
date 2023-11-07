const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const contactsPath = path.join(__dirname, "contacts.json");

async function readContacts(){
  try {
    const data = await fs.readFile(contactsPath, { encoding: 'utf-8'});
    console.log(data)
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
}

async function writeContacts(contacts){
try {
 await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
} catch (error) {
  console.error('Error writing contacts:', error);
}
}

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await readContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if(index === -1){
    return null
  }

  contacts.splice(index, 1)
  await writeContacts(contacts)
  return contacts;
}

const addContact = async (body) => {
try {
  const contacts = await readContacts();
  const {name, email, phone} = body;
  const newContacts = {
    id: crypto.randomUUID(),
    name,
    email,
    phone
  };

  contacts.push(newContacts);
  await writeContacts(contacts)
  return newContacts;
} catch (error) {
  console.error(error);
  throw error;
}
}

const updateContact = async (contactId, body) => {
try {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    const { id, name, email, phone } = body;

    const update = {
      id,
      name,
      email,
      phone,
    };

    // Обновляем контакт в массиве
    contacts[index] = update;
    await writeContacts(contacts);

    return update;
  } else {
    return null;
  }
} catch (error) {
  console.error(error);
  throw error;
}
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
