const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(
      (contact) => contact.id === contactId
    );

    if (!contactToRemove) {
      return null;
    }

    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return contactToRemove;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    if (!name || !email || !phone) {
      return null;
    }

    const contacts = await listContacts();
    const newContact = {
      id: Math.random().toString(),
      name,
      email,
      phone,
    };
    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
      encoding: "utf-8",
    });
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactToUpdate = contacts.find(
      (contact) => contact.id === contactId
    );

    const otherContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    const updatedContact = {
      ...contactToUpdate,
      ...body,
    };

    const contactsToSave = [...otherContacts, updatedContact];

    await fs.writeFile(contactsPath, JSON.stringify(contactsToSave, null, 2));
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
