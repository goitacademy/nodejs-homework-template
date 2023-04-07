const fs = require("fs/promises");

const path = require("path");
const { nanoid } = require("nanoid");
// const { date } = require("joi");

const contactsPath = path.join(__dirname, "contacts.json");

const list = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const contacts = await list();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const remove = async (id) => {
  const contacts = await list();
  const index = contacts.findIndex((item) => item.id === id);
  console.log(index);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const add = async ({ name, email, phone }) => {
  const contacts = await list();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const update = async (id, body) => {
  const contacts = await list();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  list,
  getById,
  remove,
  add,
  update,
};
