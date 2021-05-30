const fs = require("fs/promises");
const path = require("path");
// const contacts = require("./contacts.json");
const { v4: uuid } = require("uuid");

const getData = async () => {
  const data = await fs.readFile(path.join(__dirname, "contacts.json"), "utf8");
  return JSON.parse(data);
};

const listContacts = async () => {
  return await getData();
};

const getContactById = async (contactId) => {
  const data = await getData();
  const result = data.filter((contact) => String(contact.id) === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const data = await getData();
  const result = data.filter((contact) => String(contact.id) !== contactId);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(result, null, 2)
  );
  return result;
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
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(data)
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await getData();
  const result = data.filter((contact) => String(contact.id) === contactId);
  if (result) {
    Object.assign(result, body);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(data)
    );
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
