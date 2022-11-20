const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");
// import { nanoid } from 'nanoid'

const contactsPath = path.join(__dirname, "./contacts.json");
// const contactsList = fs.readFile();

async function getContactsList() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

const listContacts = async () => {
  try {
    const contacts = await getContactsList();
    return contacts;
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContactsList();
    const contactById = contacts.filter((item) => item.id === contactId);
    return contactById;
  } catch (error) {
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getContactsList();
    const filteredData = contacts.filter((item) => item.id !== contactId);
    if (filteredData.length === contacts.length) {
      return { status: "404" };
    }
    await fs.writeFile(contactsPath, JSON.stringify(filteredData), "utf8");
    return { status: "200" };
  } catch (error) {
    return error;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await getContactsList();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const filteredData = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(filteredData), "utf8");
    return { status: "201" };
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  console.log(name);
  try {
    const contacts = await getContactsList();
    contacts.forEach((item) => {
      if (item.id === contactId) {
        item.name = name ?? item.name;
        item.email = email ?? item.email;
        item.phone = phone ?? item.phone;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    return { status: "200" };
  } catch (error) {
    return error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
