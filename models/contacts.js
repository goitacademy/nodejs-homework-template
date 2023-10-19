const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((contactId) => contactId.id === id);
    return contactById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const removeById = contacts.findIndex((contactId) => contactId.id === id);
    contacts.splice(removeById, 1);
    if (removeById === -1) {
      return null;
    }
    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const contact = { id: `${contacts.length + 2}`, ...body };
    contacts.push(contact);
    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactToUpdate = contacts.find(
      (contact) => contact.id === contactId
    );

    if (!contactToUpdate) {
      return null;
    }
    const otherContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    const updatedContact = {
      ...contactToUpdate,
      ...body,
    };

    const contactsToSave = [...otherContacts, updatedContact];
    await fs.writeFile(contactsPath, JSON.stringify(contactsToSave, null, 2), {
      encoding: "utf-8",
    });
    return updatedContact;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
