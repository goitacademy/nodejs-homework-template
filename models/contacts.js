const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const pathFile = path.join(__dirname, "contacts.json");
const updateData = async (data) => {
  await fs.writeFile(pathFile, JSON.stringify(data));
};

const listContacts = async () => {
  const data = await fs.readFile(pathFile);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (id) => {
  const data = await listContacts();
  const idx = data.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = data.splice(idx, 1);
  await updateData(data);
  return removeContact;
};

const addContact = async (body) => {
  // const { name, email, phone } = body;
  const data = await listContacts();
  const newContact = { id: nanoid(), ...body };
  data.push(newContact);
  await updateData(data);
  return newContact;
};

const updateContact = async (id, body) => {
  // const { name, email, phone } = body;
  console.log(body);
  const data = await listContacts();
  const idx = data.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  data[idx] = { id, ...body };
  await updateData(data);
  return data[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
