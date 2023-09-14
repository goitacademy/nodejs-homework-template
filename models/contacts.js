const fs = require("fs/promises");

const path = require("path");

const nanoid = require("nanoid");

const contactsPath = path.resolve("models", "/contacts.json");

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const findContact = filter((item) => item.id === contactId);
  return findContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const findContact = data.findIndex((item) => item.id === contactId);
  if (findContact === -1) {
    return null;
  }
  const [result] = data.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
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

  writeContacts(data);
  return newContact;
};

const updateContact = async ({ id, name, email, phone }) => {
  const data = await listContacts();
  const contactIndex = data.find((item) => {
    if (item.id === id) {
      item.name = name;
      item.email = email;
      item.phone = phone;
      return item;
    }
  });
  if (contactIndex === -1) {
    return null;
  }

  writeContacts(data);
  return data[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
