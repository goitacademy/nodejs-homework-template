const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "db", "contacts.json");



const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: shortid.generate(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const books = await getAll();
    const index = books.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    books[index] = {id, ...data};
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return books[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
