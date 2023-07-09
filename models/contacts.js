const fs = require("fs").promises;

const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const fileWrite = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log("Помилка запису до контакту :>> ", error);
  }
};

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (error) {
    console.log("Помилка доступу до контактів :>> ", error);
  }
};

const getContactById = async (contactId) => {
  const searchContacts = await listContacts();
  try {
    const contactById = searchContacts.find(
      (contact) => contact.id === contactId
    );
    return contactById || null;
  } catch (error) {
    console.log("Помилка доступу до контакту :>> ", error);
  }
};

const removeContact = async (contactId) => {
  const arrayContacts = await listContacts();
  try {
    const index = arrayContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (index === -1) {
      return null;
    }

    const deleteContact = arrayContacts.splice(index, 1);
    fileWrite(arrayContacts);
    return deleteContact;
  } catch (error) {
    console.log("Контакт не видалено:>> ", error);
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  try {
    const newContact = { id: nanoid(), ...body };
    contacts.push(newContact);
    fileWrite(contacts);
    return newContact;
  } catch (error) {
    console.log("Контакт не додано:>> ", error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        return { contact, ...body };
      } else {
        return contact;
      }
    });
    fileWrite(newContacts);
  } catch (error) {
    console.log("Контакт не змінено:>> ", error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
