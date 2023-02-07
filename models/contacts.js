const fs = require("fs/promises");
const path = require("node:path");

const contactsPath = path.format({
  root: "/ignored",
  dir: "models",
  base: "contacts.json",
});

const idPath = path.format({
  root: "/ignored",
  dir: "models",
  base: "id.json",
});

const readLastId = async () => {
  return fs.readFile(idPath).then((id) => {
    return JSON.parse(id);
  });
};

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
  let isExist = false;
  const contacts = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts))
    .then((contacts) =>
      contacts.filter((contact) => {
        if (contact.id === contactId) {
          isExist = true;
        }
        return contact.id !== contactId;
      })
    );
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return isExist;
};

const addContact = async (body) => {
  let { id } = await readLastId();
  console.log(id);
  id = Number(id) + 1;
  body = { id: `${id}`, ...body };
  await fs.writeFile(idPath, JSON.stringify({ id }));
  const contacts = await fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts))
    .then((contacts) => [...contacts, body]);
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
