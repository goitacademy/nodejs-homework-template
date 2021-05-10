const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./model", "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    return data.find((item) => item.id.toString() === contactId);
  } catch (error) {
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    console.log(data.filter((item) => item.id !== contactId));
    await fs.writeFile(
      contactsPath,
      JSON.stringify(data.filter((item) => item.id !== contactId))
    );
    return data.find((item) => item.id === contactId);
  } catch (error) {
    return error;
  }
};

const addContact = async (body) => {
  const id = uuidv4();
  const newContact = {
    id,
    ...body,
  };
  const data = await listContacts();
  try {
    await fs.writeFile(contactsPath, JSON.stringify([...data, newContact]));
    return newContact;
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  if (data.find((item) => item.id === contactId)) {
    const updatedData = data.map((item) =>
      item.id === contactId ? { id: item.id, ...body } : item
    );
    try {
      await fs.writeFile(contactsPath, JSON.stringify(updatedData));
      return { contactId, ...body };
    } catch (error) {
      return error;
    }
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
