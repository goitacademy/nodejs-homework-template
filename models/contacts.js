const fs = require("fs/promises");
const path = require("path");


const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const updatedContacts = allContacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return updatedContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();
    allContacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return body;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const updatedContacts = allContacts.map((contact) => {
      if (String(contact.id) === String(contactId)) {
        return { ...contact, ...body };
      }
      return contact;
    });

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return updatedContacts;
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
