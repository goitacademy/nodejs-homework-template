const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

//  Read File contacts.json
async function read() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

//  Write File contacts.json
async function write(data) {
  return await fs.writeFile(contactsPath, JSON.stringify(data));
}

const listContacts = async () => {
  const data = await read();
  return data;
};

const getContactById = async (id) => {
  const data = await read();
  const result = data.find((contact) => contact.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const data = await read();
  const index = data.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  const newContacts = [...data.slice(0, index), ...data.slice(index + 1)];

  await write(newContacts);

  return data[index];
};

const addContact = async (body) => {
  const data = await read();

  const id = crypto.randomUUID();
  const newContact = { id, ...body };

  data.push(newContact);

  await write(data);

  return newContact;
};

const updateContact = async (id, body) => {
  const data = await read();
  const index = data.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  data[index] = { id, ...body };
  await write(data);
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
