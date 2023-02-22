const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const update = async (contact) =>
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const resault = contact.find((item) => item.id === contactId);
  return resault || null;
}

const removeContact = async (contactId) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await update(contact);
  return result;
}

const addContact = async (body) => {
    const contact = await listContacts();
  const newContact = {
    id: nanoid(4),
    ...body,
  };
  contact.push(newContact);
  await update(contact);
  return newContact;
}

const updateContact = async (contactId, body) => {
    const books = await listContacts();
  const index = books.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  books[index] = { contactId, ...body };
  await update(books);
  return books[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
