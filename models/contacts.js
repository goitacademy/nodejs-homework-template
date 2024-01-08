const fs = require("fs").promises;
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();

    const foundContact = data.find((contact) => contact.id === contactId);

    if (foundContact) {
      console.log("contacts is found", foundContact);
      return foundContact;
    }
    console.log("no contacts found");
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const contactIndex = data.filter((contact) => contact.id !== contactId);

    if (contactIndex !== -1) {
      const removedContact = data.splice(contactIndex, 1)[0];

      await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");
      console.log("Contact removed: ", removedContact);
      return removedContact;
    }
    console.log("No contacts found with the specified id");
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await listContacts();

    const existingContact = data.find(
      (contact) =>
        contact.name === name ||
        contact.email === email ||
        contact.phone === phone
    );
    if (existingContact) {
      console.log("Contact is already exists");
      return;
    }

    const newContact = {
      name,
      email,
      phone,
      id: uuidv4(),
    };

    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");
    console.log("new contact added", newContact);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};
const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();

  const index = data.find((contact) => contact.id === contactId);

  if (index) {
    const updatedContact = { ...data[index], ...body };
    data[index] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");

    return updatedContact;
  } else {
    throw new Error("Contact not found");
  }
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
