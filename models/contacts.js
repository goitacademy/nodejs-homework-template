const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const k = JSON.parse(data);
  return k;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const [contact] = JSON.parse(data).filter((n) => n.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const currentLength = JSON.parse(data).length;

  const currentUsers = JSON.parse(data).filter((n) => n.id !== contactId);
  if (currentLength === currentUsers.length) {
    return false;
  }
  await fs.writeFile(contactsPath, JSON.stringify(currentUsers), "utf8");
  return true;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const newContact = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };
  const data = await fs.readFile(contactsPath);

  const currentUser = [newContact, ...JSON.parse(data)];
  await fs.writeFile(contactsPath, JSON.stringify(currentUser), "utf8");
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const { name, email, phone } = body;
  let currentObj = null;
  const contacts = JSON.parse(data).map((n) => {
    if (n.id === contactId) {
      if (name) n.name = name;
      if (email) n.email = email;
      if (phone) n.phone = phone;
      currentObj = n;
    }
    return n;
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
  return currentObj;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
