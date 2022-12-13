const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");


const listContacts = async () => {
  try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    }
    catch (error) {
        console.log(error.message);
    }
}

const getContactById = async (contactId) => {
  try {
        const contacts = await listContacts();
        const result = contacts.find((item) => item.id === contactId);
        if (!result) {
            return null;
        }
        return result;
    }
    catch (error) {
        console.log(error.message);
    }
}

const removeContact = async (contactId) => {
  try {
        const contacts = await listContacts();
        const refreshedContacts = contacts.filter((item) => item.id !== contactId);
        await updateFile(refreshedContacts);
        const result = contacts.filter((item) => item.id === contactId);
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

const addContact = async (body) => {
  try {
        const contacts = await listContacts();
        const newContact = {
            id: v4(),
            body,
        };
        const refreshedContacts = [...contacts, newContact];
        await updateFile(refreshedContacts);
        return newContact;
    } catch (error) {
        console.log(error.message);
  }
}

const updateContact = async (contactId, body) => { }

async function updateFile(data) {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
