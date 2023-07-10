const fs = require("fs").promises;

const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const fileWrite = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const searchContacts = await listContacts();

  const contactById = searchContacts.find(
    (contact) => contact.id === contactId
  );
  return contactById || null;
};

const removeContact = async (contactId) => {
  const arrayContacts = await listContacts();

  const index = arrayContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const deleteContact = arrayContacts.splice(index, 1);
  fileWrite(arrayContacts);
  return deleteContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  fileWrite(contacts);
  return newContact;
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
