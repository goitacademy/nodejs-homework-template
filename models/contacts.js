const { error } = require("console");
const { randomUUID } = require("crypto");
const fs = require("fs/promises");
const path = require("path");

const pathDb = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(pathDb);
  const result = JSON.parse(data);
  return result;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(pathDb);
  const result = JSON.parse(data);
  const filter = result.find((contact) => contact.id === contactId);
  if (!filter) {
    return error.status(404);
  }
  return filter;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(pathDb);
  const result = JSON.parse(data);
  const checkId = result.findIndex((contact) => contact.id === contactId);
  if (checkId === -1) {
    return error.status(404).json({ message: "Not found" });
  }
  const del = result.filter((contact) => contact.id !== contactId);
  await fs.writeFile(pathDb, JSON.stringify(del));
  return del;
};

const addContact = async (body) => {
  const data = await fs.readFile(pathDb);
  const result = JSON.parse(data);
  if (!body.email || !body.name || !body.phone) {
    return error.status(400);
  }
  const addNew = {
    id: randomUUID(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  result.push(addNew);
  await fs.writeFile(pathDb, JSON.stringify(result));
  return addNew;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(pathDb);
  const result = JSON.parse(data);
  const checkId = result.findIndex((contact) => contact.id === contactId);
  if (checkId === -1) {
    return null;
  }

  const update = { ...result[checkId], ...body };
  result[checkId] = update;

  await fs.writeFile(pathDb, JSON.stringify(result));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
