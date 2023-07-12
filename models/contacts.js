const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
  } catch (error) {
    error.message = "Ups... can't read the contacts";
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return console.log(contact || null);
  } catch (error) {
    error.message = "Ups... can't read the contacts";
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index !== -1) {
      return null;
    }
    const [contact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (error) {
    error.message = " Ups.. Can not delete this Contact";
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const id = nanoid();
    const contacts = await listContacts();
    const contact = {
      id: id,
      ...body,
    };
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact || null;
  } catch (error) {
    error.message = "Can Not Add This Contact Please Try Again Later ";
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(((item) => item.id === contactId));
    if (index === -1){
      return null
    }
    contacts[index] ={contactId,...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2));
    return contacts[index];
}catch(error){
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
