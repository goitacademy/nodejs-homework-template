const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.format({
  root: "/ignored",
  dir: __dirname,
  base: "contacts.json",
});

const listContacts = async () => {
  return fs.readFile(contactsPath).then((contacts) => JSON.parse(contacts));
};

const getContactById = async (contactId) => {
  return fs
    .readFile(contactsPath)
    .then((contact) => JSON.parse(contact))
    .then((contacts) => contacts.filter((contact) => contact.id === contactId));
};

const removeContact = async (contactId) => {
  const contactList = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts));

  const filteredList = contactList.filter((contact) => {
    return contact.id !== contactId;
  });

  fs.writeFile(contactsPath, JSON.stringify(filteredList));
};

const addContact = async (body) => {
  const newContact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  const contactList = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts));

  contactList.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(contactList));
};

const updateContact = async (contactId, body) => {
  const contactList = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts));

  const contact = contactList.find((contact) => {
    return contact.id === contactId;
  });

  const updatedContact = {
    id: contact.id,
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  contactList.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = updatedContact.name;
      contact.email = updatedContact.email;
      contact.phone = updatedContact.phone;
    }
  });

  fs.writeFile(contactsPath, JSON.stringify(contactList));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
