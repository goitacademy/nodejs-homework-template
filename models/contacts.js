const fs = require('fs').promises;
const path = require('path');
const { v4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
   try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.log(error)
    }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const currentContact = contacts.find((contact) => contact.id === contactId);

    if (!currentContact) {
      return null;
    }

    return currentContact;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
      const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
       fs.writeFile(
        contactsPath,
        JSON.stringify(filteredContacts)
      );
      console.log(`The contact id:${contactId} was successfully deleted`)
    } catch (err) {
      console.log(err);
    }
}

const addContact = async (name, email, phone) => {
  try {
      const contacts = await listContacts();
      const newContact = {id: v4(), name, email, phone};
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return newContact;
    } catch (error) {
      console.log(error);
    }
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  if (!body) {
    return null;
  }

  contacts[index] = {id: contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
