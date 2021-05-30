const fs = require("fs/promises");
const path = require("path");
const contacts = require("./contacts.json");
const { v4: uuid } = require("uuid");

const getData = async () => {
  const data = await fs.readFile(path.join(__dirname, contacts), "utf8");
  return JSON.parse(data);
};

const listContacts = async () => {
  return await getData();
};

const getContactById = async (contactId) => {
  const data = await getData();
  const [result] = data.filter((contact) => contact.contactId === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const data = await getData();
  const index = data.findIndex((contact) => contact.contactId === contactId);
  if (index !== -1) {
    const result = data.splice(index, 1);
    await fs.writeFile(path.join(__dirname, contacts), JSON.stringify(data));
    return result;
  }
  return null;
};

const addContact = async (body) => {
  const id = uuid();
  const { name, email, phone } = body;
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const data = await getData();
  data.push(newContact);
  await fs.writeFile(path.join(__dirname, contacts), JSON.stringify(data));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await getData();
  const [result] = data.filter((contact) => contact.contactId === contactId);
  if (result) {
    Object.assign(result, body);
    await fs.writeFile(path.join(__dirname, contacts), JSON.stringify(data));
  }
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
