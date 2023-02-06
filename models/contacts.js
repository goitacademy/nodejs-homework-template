const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile(contactsPath);
    return JSON.parse(readContacts);
  } catch (error) {
    console.log("Load error", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const getContact = contacts.find((contact) => contact.id === contactId);
    return getContact;
  } catch (error) {
    console.log("Get error", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const getContact = await getContactById(contactId);
    const removeContact = contacts.filter((cont) => cont.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(removeContact));
    return getContact;
  } catch (error) {
    console.log("Remove error", error.message);
  }
};

const pushContacts = async (contacts) => {
  try {
    const stringifyContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, stringifyContacts);
  } catch (error) {
    console.log("Push error", error.message);
  }
};

const generateNewContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const lastId =
      Math.max(...contacts.map((contact) => parseInt(contact.id, 10))) + 1;
    return { id: lastId.toString(), name, email, phone };
  } catch (error) {
    console.log("Generate error", error.message);
  }
};

const addContact = async (body) => {
  try {
    if (!body) return;
    const contacts = await listContacts();
    const newContact = await generateNewContact(body);
    await contacts.push(newContact);
    await pushContacts(contacts);
  } catch (error) {
    console.log("Add error", error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updateContactsList = contacts.map((cont) =>
      cont.id === contactId ? { ...cont, ...body } : cont
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
  generateNewContact,
};
