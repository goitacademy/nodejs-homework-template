const fs = require('fs/promises')
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  console.log(data)
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

const removeContact = async (id) => {
  const books = await listContacts();
    const index = books.findIndex(item => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = books.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(books, null, 2));
    return result;
}

const addContact = async (body) => {
  const books = await listContacts();
  const newBook = {
    id: nanoid(),
    ...body,
  }
  books.push(newBook);
  await fs.writeFile(contactsPath, JSON.stringify(books, null, 2));
  return newBook;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
