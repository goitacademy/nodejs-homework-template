const fs = require("fs/promises");

const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve("./models/contacts.json");

const readContacts = () => fs.readFile(contactsPath, "utf8");
const writeContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

const listContacts = async () => {
  const contacts = await readContacts();

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findedContact = contacts.find((contact) => contact.id === contactId);

  return findedContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removededContact = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeContacts(removededContact);
  return removededContact;
};

const addContact = async (body) => {
  const newUser = {
    id: uuidv4(),
    ...body,
  };
  const contacts = await listContacts();
  contacts.push(newUser);
  await writeContacts(contacts);

  return newUser;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  contacts.forEach((element) => {
    if (element.id === contactId) {
      element.name = name;
      element.email = email;
      element.phone = phone;
    }
  });
  await writeContacts(contacts);
  return body;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
