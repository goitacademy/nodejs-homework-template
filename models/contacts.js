const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.resolve(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

async function readContacts() {
  try {
    const dataContacts = await fs.readFile(contactsPath);
    const contacts = JSON.parse(dataContacts);
    return contacts;
  } catch (error) {
      console.log(error);
  }
}

async function writeContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error);
  }
}

const listContacts = async ({ limit = 0 }) => {
  try {
    const contacts = await readContacts();
    return contacts.slice(-limit);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts();
    const resultContact = await contacts.find(({ id }) => id === contactId);
    return resultContact || null;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeContacts(updatedContacts);
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (body) => {
  try {
    const id = nanoid();
    const contacts = await readContacts();
    const { name, email, phone } = body;
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts();
    const { name, email, phone } = body;
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
      return contact;
    });
    await writeContacts(updatedContacts);
    return await getContactById(contactId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
