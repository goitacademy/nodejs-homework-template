const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  console.log(result);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  console.log("work");
  const contacts = await listContacts();
  const result = contacts.find((item) => {
    console.log(item.id, contactId);
    return item.id === contactId;
  });
  console.log(result);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const { name, email, phone } = body;

  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await updateContacts(contacts);
  return contacts[index];
};

const updateContacts = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateById,
};
