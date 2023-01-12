const { randomUUID } = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const currentUser = JSON.parse(data).find((item) => contactId === item.id);
  return currentUser;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const flag = JSON.parse(data).find((item) => contactId === item.id);
  if (!flag) {
    return null;
  }
  const currentUsers = JSON.parse(data).filter((item) => contactId !== item.id);
  await fs.writeFile(contactsPath, JSON.stringify(currentUsers), "utf8");
  return flag;
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath);
  const user = {
    id: randomUUID(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  const currentUsers = [...JSON.parse(data), user];
  await fs.writeFile(contactsPath, JSON.stringify(currentUsers), "utf8");
  return user;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const flag = JSON.parse(data).find((item) => contactId === item.id);
  if (!flag) {
    return null;
  }
  const currentUsers = JSON.parse(data).map((contact) => {
    if (contact.id === contactId) {
      contact.name = body.name;
      contact.email = body.email;
      contact.phone = body.phone;
      return contact;
    }
    return contact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(currentUsers), "utf8");
  user = currentUsers.find((item) => item.id === contactId);
  return user;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
