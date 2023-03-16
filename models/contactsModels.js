// const fs = require('fs/promises')

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    console.table(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) throw new Error(`Contact with id=${contactId} not found`);
    console.table(contact);
    return contact;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

    console.log(`Contact with id=${contactId} has been removed`);
    console.table(updatedContacts);
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (contact) => {
  try {
    const contacts = await listContacts();

    const newContact = { id: Date.now(), ...contact };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    console.log("New contact has been added");
    console.table(contacts);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = {
      id: contactId,
      ...body,
    };
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const tempIndex = contacts.findIndex(({ id }) => id === contactId);

    contacts[tempIndex] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return contacts[tempIndex];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
