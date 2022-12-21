const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// listContacts();

const getContactById = async (contactId) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const contactById = data.filter((contact) => contact.id === contactId);
    if (!contactId) {
      return { message: "Not found" };
    }

    console.log(contactById);
    return contactById;
  } catch (error) {
    console.log(error);
  }
};
// getContactById('1');

const addContact = async ({ name, email, phone }) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const newContact = { id: uid(3), name, email, phone };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    console.log("The contact was added");
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const filteredContacts = JSON.stringify(
      data.filter((contact) => contact.id !== contactId)
    );
    await fs.writeFile(contactsPath, filteredContacts, "utf8");
    console.log("The contact was removed");
    return { message: "The contact was removed" };
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const { name, email, phone } = body;
    const index = data.findIndex((contact) => contact.id === contactId);
    const changedContact = { contactId, name, email, phone };
    data.splice(index, 1, changedContact);

    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    console.log("The contact was added");
    return changedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
