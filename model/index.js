const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function getContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (e) {}
}

async function listContacts() {
  try {
    const contacts = await getContacts();
    console.table(contacts);
    return contacts;
  } catch (e) {}
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();
    const contactById = await contacts.find(({ id }) => id === contactId);

    if (!contactById) {
      return console.error("Contact not found!");
    }
    console.table(contactById);
    return contactById;
  } catch (e) {}
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts();
    const data = await contacts.filter(({ id }) => id !== contactId);

    if (data.length === contacts.length) {
      return console.error("Contact not found!");
    }
    await fs.writeFile(contactsPath, JSON.stringify(data));
    console.log("Contact deleted successfully!");
    console.table(data);
    return data;
  } catch (e) {}
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getContacts();
    const contactName = contacts.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    const contactEmail = contacts.find((item) => item.email === email);
    const contactPhone = contacts.find((item) => item.phone === phone);
    if (contactName) {
      return console.log("This name already exists!");
    }
    if (contactEmail) {
      return console.log("This email already exists!");
    }
    if (contactPhone) {
      return console.log("This phone already exists!");
    }

    const newContact = { id: shortid.generate(), name, email, phone };
    const data = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(data));
    console.log("Contact added successfully!");
    console.table(data);
    return data;
  } catch (e) {}
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  getContacts,
};
