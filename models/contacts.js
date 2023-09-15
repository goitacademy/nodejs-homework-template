const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  try {
    const filePath = path.join(__dirname, "contacts.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const filePath = path.join(__dirname, "contacts.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const contacts = JSON.parse(fileContent);

    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      return console.log("Contact not found.");
    }
    return contact;
  } catch (error) {
    console.error("Error reading contacts file:", error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (filteredContacts.length === contacts.length) {
      return false;
    }
    const filePath = path.join(__dirname, "contacts.json");
    await fs.writeFile(
      filePath,
      JSON.stringify(filteredContacts, null, 2),
      "utf-8"
    );
    return true;
  } catch (error) {
    console.error("Error delete contact:", error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      ...body,
    };
    contacts.push(newContact);
    const filePath = path.join(__dirname, "contacts.json");
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2), "utf-8");
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
if (contactIndex !== -1) {
  const updatedContact = { ...contacts[contactIndex], ...body };
  contacts[contactIndex] = updatedContact;
  const filePath = path.join(__dirname, "contacts.json");
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2), "utf-8");
  return updatedContact; 
} else {
  return null; 
}
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
