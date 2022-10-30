const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const list = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(list);
};

const getContactById = async (Id) => {
  const list = await listContacts();
  const [item] = list.filter(({id}) => id === Id);
  return item;
};

const removeContact = async (Id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({index}) => index.toString() === Id);
  if (index === -1) return null;
  const update = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return update;
};

const addContact = async (body) => {
  const {name, email, phone} = body;
  const contacts = await listContacts();
  const add = {
    id: nanoid(5),
    name,
    email,
    phone,
  };
  contacts.push(add);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
  return add;
};

const updateContact = async (Id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({id}) => id.toString() === Id);
  if (index === -1) return null;
  contacts[index] = {...contacts[index], ...body};

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
