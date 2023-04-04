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
  return filter;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const data = await fs.readFile(pathDb);
  const result = JSON.parse(data);
  if (!body.email || !body.name || !body.phone) {
    return error.json({ message: "Invalid params" });
  }
  const addNew = {
    id: randomUUID(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  result.push(addNew);
  await fs.writeFile(pathDb, JSON.stringify(result));
  return result;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
