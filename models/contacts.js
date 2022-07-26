const { nanoid } = require("nanoid");
const fs = require('fs/promises');
const path = require("path");
const contactsPath = path.join(__dirname, "/contacts.json");

/* весь список контактів */

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

 /* контакт по id */ 

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  if(!result) {
    return null;
  }
  return result;
}

/* додавання контакту */ 

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

/* видалення контакту */ 

const removeContact = async (id) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex(item => item.id === id);
  if(idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
}

/* оновлення контакту */ 

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex(item => item.id === id);
  if(idx === -1) {
    return null;
  }
  contacts[idx] = {name, email, phone};
  await updateContact(contacts);
  return contacts[idx];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
