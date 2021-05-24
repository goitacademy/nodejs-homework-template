const fs = require("fs/promises");
const contacts = require("./contacts.json");
const { v4: uuid } = require("uuid");
const path = require("path");

const pathName = path.join(__dirname, "contacts.json");

const readData = async () => {
  const data = await fs.readFile(pathName, "utf-8");
  return JSON.parse(data);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const data = await readData();
  const [filteredData] = await data.filter(({ id }) => id === contactId);
  return filteredData;
};

const removeContact = async (contactId) => {
  const data = await readData();
  const deletedContactIdx = await data.findIndex(({ id }) => id === contactId);
  if (deletedContactIdx !== -1) {
    const deletedContact = data.splice(deletedContactIdx, 1);
    const newData = data.filter(({ id }) => id !== contactId);
    await fs.writeFile(pathName, JSON.stringify(newData, null, 2));
    return deletedContact;
  }
  return null;
};

const addContact = async (body) => {
  const id = uuid();
  const newContact = {
    id,
    ...body,
  };
  const data = await readData();
  data.push(newContact);
  await fs.writeFile(pathName, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await readData();
  const selectedContact = data.find(({ id }) => id === contactId);
  if (selectedContact) {
    Object.assign(selectedContact, body);
    await fs.writeFile(pathName, JSON.stringify(data, null, 2));
  }
  return selectedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
