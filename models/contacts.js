const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    if (!contacts) {
      return null;
    }
    return contacts;
  } catch (error) {
    return null;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    if (!contact) {
      return null;
    }
    const updateContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: Date.now().toString(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updateContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        return {
          ...contact,
          ...body,
        };
      }
      return contact;
    });
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    const updateContact = updateContacts.find(({ id }) => id === contactId);
    if (!updateContact) {
      return null;
    }
    return updateContact;
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
