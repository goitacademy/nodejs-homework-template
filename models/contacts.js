const fs = require("fs/promises");
const patch = require("path");
const { nanoid } = require("nanoid");
const contactPath = patch.join(__dirname, "contacts.json");

const refreshContact = async (constacs) =>
  await fs.writeFile(contactPath, JSON.stringify(constacs, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === id);

  return result || null;
};

const removeContact = async (id) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await refreshContact(data);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await refreshContact(data);
  return newContact;
};
const updateContact = async (id, data) => {
  const constact = await listContacts();

  const index = constact.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  constact[index] = { id, ...data };
  await refreshContact(constact);
  return constact[index];
};
module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
