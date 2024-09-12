const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  console.log("🚀 ~ contactId:", contactId);
  try {
    const data = await listContacts();
    const contact = data.find((item) => item.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const index = data.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return;
    }
    const [result] = data.splice(index, 1);
    console.log("🚀 ~ result:", result);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const data = await listContacts();
    const newContact = {
      ...body,
      id: nanoid(),
    };
    const contactsData = [...data, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const index = data.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return;
    }
    data[index] = { ...body, id: contactId };
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return data[index];
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