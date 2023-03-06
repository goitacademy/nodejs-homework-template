const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const contact = contactsArr.find(
      (element) => element.id === contactId
    );
    if (!contact) {
      return console.log("Contact not found");
    }
    return contact;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const contact = await getContactById(contactId);
    const itemIndex = contactsArr.findIndex(
      (element) => element.id === contactId
    );
    if (itemIndex === -1) {
      return null;
    }
    contactsArr.splice(itemIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
    return contact;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const addContact = async (body) => {
  try {
    const contactsArr = await listContacts();
    const newContact = {
      id: v4(),
      ...body,
    };
    const newContactsArr = [...contactsArr, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsArr));
    return newContact;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsArr = await listContacts();
    const itemIndex = contactsArr.findIndex((element) => element.id === contactId);
    if (itemIndex === -1) return null;
    contactsArr[itemIndex] = { ...contactsArr[itemIndex], ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
    return contactsArr[itemIndex];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
