// const fs = require("fs/promises");
const path = require("path");
const fs = require("fs/promises");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const delContact = contacts.find((contact) => contact.id === contactId);
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return delContact;
  } else {
    console.log("Номер с таким id не найден");
  }
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };

  if (contacts.some((item) => item.phone === newContact.phone)) {
    return console.log("Такой контакт уже существует");
  } else {
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }
};

const updateContact = async (contact, body, id) => {
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    throw new Error("The required field is missing");
  } else {
    contact = {
      id,
      name,
      email,
      phone,
    };
    return contact;
  }
};

const updateContacts = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  const index = contacts.findIndex((item) => item.id === contactId);
  const changeContact = await updateContact(contact, body, contactId);
  contacts.splice(index, 1, changeContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
