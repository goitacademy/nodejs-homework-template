const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts.find((el) => el.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const contact = contacts.find((el) => el.id === contactId);
  if (!contact) {
    return contact;
  }
  const filteredContacts = contacts.filter((el) => el.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return contact;
};

const addContact = async (body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  contacts.push(body);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return body;
};

const updateContact = async (contactId, body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const { name, email, phone } = body;
  const contact = contacts.find((el) => el.id === contactId);
  if (contact) {
    contacts.forEach((contact) => {
      if (contact.id === contactId) {
        if (name) {
          contact.name = name;
        }
        if (email) {
          contact.email = email;
        }
        if (phone) {
          contact.phone = phone;
        }
      }
    });
    fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
