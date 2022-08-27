const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log("Error", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactById = contacts.find((e) => e.id === contactId.toString());
    return contactById;
  } catch (error) {
    console.log("Error", error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactById = contacts.find((e) => e.id === contactId.toString());
    if (!contactById) return contactById;
    const newContacts = contacts.filter((e) => e.id !== contactId.toString());
    await fs.writeFile(contactsPath, newContacts, "utf-8");
    return contactById;
  } catch (error) {
    console.log("Error", error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = { id: uuidv4(), name, email, phone };
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    if (contacts.find((e) => e.email === newContact.email)) {
      console.log("Contact with this email already exists");
      return false;
    }
    const newListContacts = JSON.stringify([...contacts, newContact]);
    await fs.writeFile(contactsPath, newListContacts, "utf-8");
    return newContact;
  } catch (error) {
    console.log("Error", error);
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const changedContacts = contacts.map((e) => {
      if (e.id === contactId.toString()) {
        if (name) e.name = name;
        if (email) e.email = email;
        if (phone) e.phone = phone;
      }
      return e;
    });
    await fs.writeFile(JSON.stringify(contactsPath), changedContacts, "utf-8");
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
