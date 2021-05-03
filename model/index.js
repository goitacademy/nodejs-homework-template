const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./contacts.json");
// const contacts  = require("./contacts.json")

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactList = await listContacts();
    const contact = contactList.find(({ id }) => id.toString() === contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {  
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(({ id }) => id.toString() === contactId);
    if (!contact) return;
    const newContacts = contactsList.filter(
      ({ id }) => id.toString() !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      "utf8"
    );
    return contact;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await listContacts();
    const newContact = { id: shortid.generate(), ...body };
    contactsList.push(newContact);
    const newContacts = JSON.stringify(contactsList);
    await fs.writeFile(contactsPath, newContacts, "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await listContacts();
    const index = contactsList.findIndex(
      ({ id }) => id.toString() === contactId
    );
    if (index === -1) return;
    contactsList[index] = { ...contactsList[index], ...body };
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsList, null, 2),
      "utf8"
    );
    return contactsList[index];
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
