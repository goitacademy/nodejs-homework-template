const fs = require("fs/promises");
const { uuid } = require("uuid").v4;
const path = require("path");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  // Возвращает массив контактов.
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  // Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  try {
    console.log(contactId);
    const contacts = await listContacts();
    const contact = contacts.filter((contact) => contact.id === contactId);
    if (contact.length > 0) return contact;
    return null;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  // Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await listContacts();
    const contact = getContactById(contactId);
    if (contact) {
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ id, name, email, phone }) => {
  // Возвращает объект добавленного контакта.
  try {
    const id = uuid();
    const newContact = { id, name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return getContactById(id);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
