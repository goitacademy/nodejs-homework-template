const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    console.log(contactsPath);
    const readContacts = await fs.readFile(contactsPath);
    console.log("Loading...");
    return JSON.parse(readContacts);
  } catch (error) {
    console.log("Load error", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const getContactsList = await listContacts();
    const getContact = getContactsList.find((cont) => cont.id === contactId);
    return getContact;
  } catch (error) {
    console.log("Get error", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const getContactsList = await listContacts();
    const getContact = await getContactById(contactId);
    const removeContact = getContactsList.filter(
      (cont) => cont.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(removeContact));
    return getContact;
  } catch (error) {
    console.log("Remove error", error.message);
  }
};

const addContact = async (body) => {
  try {
    const getContactsList = await listContacts();
    if (!body.name) {
      throw new Error("Missing required 'name' field");
    }
    const addNewContact = {
      id: nanoid(),
      ...body,
    };
    const newContactsList = [...getContactsList, addNewContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return addNewContact;
  } catch (error) {
    console.log("Add error", error.message);
    throw error; 
  }
};

const updateContact = async (contactId, body) => {
  try {
    const getContactsList = await listContacts();
    const updateContactsList = getContactsList.map((cont) =>
      (cont.id === contactId ? { ...cont, ...body } : cont)
    );
    await fs.writeFile(contactsPath, JSON.stringify(updateContactsList));
    const getUpdateContact = await getContactById(contactId);
    return getUpdateContact;
  } catch (error) {
    console.log("Update error", error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};