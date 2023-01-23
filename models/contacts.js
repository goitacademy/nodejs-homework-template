const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const getContactsArray = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const listContacts = () => {
  return getContactsArray();
};

const getContactById = async (contactId) => {
  const contacts = await getContactsArray();
  const currentContact = await contacts.find(
    (contact) => contact.id === contactId
  );
  return currentContact;
};

const removeContact = async (contactId) => {
  const contacts = await getContactsArray();
  const currentContact = await contacts.find(
    (contact) => contact.id === contactId
  );

  const newContactsArray = await contacts.filter(
    (contact) => contact.id !== contactId
  );

  console.log(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(newContactsArray));
  return currentContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await getContactsArray();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getContactsArray();
  const currentContact = contacts.map((contact) => {
    const id = contact.id;
    if (id === contactId) {
      return {
        ...contact,
        ...body,
      };
    }
    return contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(currentContact), "utf8");

  const updatedContact = currentContact.find(
    (contact) => contact.id === contactId
  );

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
