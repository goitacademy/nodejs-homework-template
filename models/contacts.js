const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const searchedContact = parsedContacts.find(
      (contact) => contact.id.toString() === contactId
    );
    return searchedContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const updatedContacts = parsedContacts.filter(
      (contact) => contact.id.toString() !== contactId
    );

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
  } catch (error) {
    console.error(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone.toString(),
    };
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    parsedContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf8");
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    let updatedContact;
    parsedContacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name || contact.name;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;
        updatedContact = contact;
      }
    });
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf8");
    return updatedContact;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
