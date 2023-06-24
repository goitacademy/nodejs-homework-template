import { nanoid } from "nanoid";
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.format({
  root: "/ignored",
  dir: "models",
  base: "contacts.json",
});

const listContacts = async () => {
  return fs.readFile(contactsPath).then((contacts) => {
    return JSON.parse(contacts);
  });
};

const getContactById = async (contactId) => {
  return fs
    .readFile(contactsPath)
    .then((contacts) =>
      JSON.parse(contacts).find((contact) => contact.id === contactId)
    );
};

const removeContact = async (contactId) => {
  let contactExist;
  const contacts = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts))
    .then((contacts) =>
      contacts.filter((contact) => {
        if (contact.id === contactId) {
          contactExist = true;
        }
        return (contactExist = false);
      })
    );
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactExist;
};

const addContact = async (body) => {
  const contacts = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts))
    .then((contacts) => {
      const contactId = nanoid();
      body = { id: contactId, ...body };
      return [...contacts, body];
    });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return body;
};

const updateContact = async (contactId, body) => {
  let contactExist;
  const contacts = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts))
    .then((contacts) => {
      contacts.forEach((contact, index, array) => {
        if (contact.id === contactId) {
          contact = { ...contact, ...body };
          isContact = contact;
          array.splice(index, 1, contact);
        }
      });
      return contacts;
    });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactExist;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
