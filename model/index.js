const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};
const listContacts = async () => {
  try {
    return await readContacts();
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts();
    const selectContacts = isNaN(contactId)
      ? contacts.find(({ id }) => id === contactId)
      : contacts.find(({ id }) => id === +contactId);
    if (!selectContacts) {
      return null;
    }
    return selectContacts;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();
    const idx = isNaN(contactId)
      ? contacts.findIndex((item) => item.id === contactId)
      : contacts.findIndex((item) => item.id === +contactId);
    if (idx === -1) {
      throw new Error(`Product with id=${id} not found`);
    }
    const filterContacts = contacts.filter(({ id }) => id !== +contactId);
    const contactsString = JSON.stringify(filterContacts, null, 2);
    await fs.writeFile(contactsPath, contactsString);
    console.log(filterContacts);
    return filterContacts;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const newContact = {
      ...body,
    };
    const contacts = await readContacts();
    contacts.push(newContact);
    const contactsString = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, contactsString);
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts();
    const [result] = isNaN(contactId)
      ? contacts.filter((contact) => contact.id === contactId)
      : contacts.filter((contact) => contact.id === +contactId);
    if (result) {
      Object.assign(result, body);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    }
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
