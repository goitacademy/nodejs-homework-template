const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const fileContent = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(fileContent);

    return contacts;
  } catch (err) {
    console.error(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);

    return contact;
  } catch (err) {
    console.error(err.message);
  }
};

const addContact = async (contact) => {
  try {
    const contacts = await listContacts();
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.error(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const i = contacts.findIndex(({ id }) => id === contactId);

    if (i > -1) {
      contacts.splice(i, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);

    if (contact) {
      contact.name = body.name;
      contact.email = body.email;
      contact.phone = body.phone;

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contact;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
