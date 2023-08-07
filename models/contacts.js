const fs = require('fs/promises');
const path = require("path");

const contactsPath = path.join(__dirname, 'contacts.json'); 

const listContacts = () => {
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

const addContact = async (body) => {
  const date = new Date();

  const contacts = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const contactId = (
        Math.floor(Math.random() * 1000) * parseInt(date.getTime() / 100)
      ).toString();
      body = { id: contactId, ...body };
      return [...contacts, body];
    });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return body;
};

const removeContact = async (contactId) => {
  let isContact = false;
  const contacts = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) =>
      contacts.filter((contact) => {
        if (contact.id === contactId) {
          isContact = true;
        }
        return contact.id !== contactId;
      })
    );
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return isContact;
};

const updateContact = async (contactId, body) => {
  let isContact = false;
  const contacts = await fs
    .readFile(contactsPath)
    .then(data => JSON.parse(data))
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
  return isContact;
}
 

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
