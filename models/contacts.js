const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const data = await fs
    .readFile(contactsPath, "utf-8")
    .then((contacts) => contacts);
  const contactsArray = JSON.parse(data);
  return contactsArray;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contactsArray = JSON.parse(data);
  const foundContact = contactsArray.find(
    (contact) => contact.id === contactId
  );
  if (typeof foundContact === "undefined") {
    console.log(null);
    return null;
  }

  console.log(foundContact);
  return foundContact;
};

const removeContact = async (contactId) => {
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return null;
  }

  const contacts = await listContacts();
  const contactsWithoutDeleted = contacts.filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsWithoutDeleted, null, 2)
  );

  return contactById;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
