const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");


const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile(contactsPath);
    return JSON.parse(readContacts);
  } catch (error) {
    console.log("Load error", error.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const getContactsList = await listContacts();
    const getContact = getContactsList.find((cont) => cont.id === contactId);
    return getContact;
  } catch (err) {
    console.log("Get error", err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const getContactsList = await listContacts();
    const getContact = await getContactById(contactId);
    const removeContact = getContactsList.filter((cont) => cont.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(removeContact));
    return getContact;
  } catch (err) {
    console.log("Remove error", err.message);
  }
};

const addContact = async (body) => {
  try {
    const getContactsList = await listContacts();
    const addNewContact = {
      id: v4(),
      ...body,
    };
     const newContactsList = [...getContactsList, addNewContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return addNewContact;
  } catch (err) {
    console.log("Add error", err.message);
  }
}


const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
