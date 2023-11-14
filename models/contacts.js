const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// Возвращает массив контактов
const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error);
  }
};

// Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error(error);
  }
};

// Возвращает объект добавленного контакта.
const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();

    const newContact = { id: nanoid(), name, email, phone };

    contacts.push(newContact);

    await updateContacts(contacts);

    return newContact;
  } catch (error) {
    console.error("Error in addContact:", error);
  }
};

// Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      console.log("Contact not found");
      return null;
    }

    const deletedContact = contacts.splice(index, 1);
    await updateContact(contacts);

    return deletedContact;
  } catch (error) {
    console.error(error);
  }
};

// Возвращает обьект обновлённого контакта
const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      console.log("Contact not found");
      return null;
    }

    contacts[index] = { ...contacts[index], ...body };

    await updateContacts(contacts);

    return contacts[index];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
