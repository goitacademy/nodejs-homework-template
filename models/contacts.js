const fs = require("fs/promises");
const path = require("node:path");

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

const getContactById = async (id) => {
  return fs
    .readFile(contactsPath)
    .then((contacts) =>
      JSON.parse(contacts).find((contact) => contact.id === id)
    );
};

const removeContact = async (id) => {
  let isExist = false;
  const contacts = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts))
    .then((contacts) =>
      contacts.filter((contact) => {
        if (contact.id === id) {
          isExist = true;
        }
        return contact.id !== id;
      })
    );
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return isExist;
};

const addContact = async (body) => {
  const contacts = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts))
    .then((contacts) => {
      const id = contacts.reduce((newId, contact) => {
        if (Number(contact.id) < newId) {
          return newId
        }
        return Number(contact.id) + 1;
      },1)
      body = { id: `${id}`, ...body };
      return [...contacts, body]
    });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return body;
};

const updateContact = async (contactId, body) => {
  let isExist = false;
  const contacts = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts))
    .then((contacts) => {
      contacts.forEach((contact, index, array) => {
        if (contact.id === contactId) {
          contact = { ...contact, ...body };
          isExist = contact;
          array.splice(index, 1, contact);
        }
      });

      return contacts;
    });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return isExist;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
