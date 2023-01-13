const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const readContacts = async () => {
  try {
    const contactsRaw = await fs.readFile(contactsPath);
    return JSON.parse(contactsRaw);
  } catch (e) {
    console.log(e.message);
  }
};

const writeContacts = async (db) => {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
};

// return list of Contacts
const listContacts = async () => {
  try {
    return readContacts();
  } catch (e) {
    console.log(e.message);
  }
};

// return contact by Id
const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error.message);
  }
};

// remove contact by id
const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    writeContacts(filteredContacts);
  } catch (error) {}
};

// add new contact
const addContact = async (body) => {
  try {
    const contacts = await readContacts();
    const newContact = {
      id: nanoid(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    contacts.push(newContact);
    writeContacts(contacts);

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

// update Contact by Id
const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts();
    const indexWantedContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    const wantedContact = contacts.find((contact) => contact.id === contactId);
    const updatedContact = { ...wantedContact, ...body };

    contacts.splice(indexWantedContact, 1, updatedContact);

    writeContacts(contacts);

    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
