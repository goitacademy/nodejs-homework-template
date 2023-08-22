const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateData = async (data) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

const listContacts = async () => {
  try {
    const res = await fs.readFile(contactsPath);
    return JSON.parse(res);
  } catch (error) {
    console.error("Error reading contacts:", error);
    throw error;
  }
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const res = contacts.find((contact) => contact.id === id);
  return res || null;
};

const addContact = async (contact) => {
  const contacts = await listContacts();
  const newContact = { id: ObjectID(), ...contact };
  contacts.push(newContact);
  await updateData(contacts);
  return newContact;
};

const updateContact = async (id, contact) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((e) => e.id === id);
  if (idx === -1) {
    return null;
  }
  const updatedContact = { ...contacts[idx], ...contact };
  contacts[idx] = updatedContact;
  await updateData(contacts);
  return updatedContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((e) => e.id === id);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await updateData(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
