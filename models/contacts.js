const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const filePath = path.join(__dirname, "contacts.json");

// Get contact list
const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};
// Get contact from list by id
const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === String(id));
  if (!result) {
    return null;
  }
  return result;
};

// Delete contact from list by id
const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === String(id));
  if (idx === -1) {
    return null;
  }
  const newListContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(filePath, JSON.stringify(newListContacts));
  return newListContacts;
};

// Add contact to list
const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
};

// Update contact by id
const updateContact = async (id, body) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === String(id));
  if (idx === -1) {
    return null;
  }
  // const { name, email, phone } = body;
  // idx.name = name;
  // idx.email = email;
  // idx.phone = phone;
  const item = await getContactById(id);
  console.log("____", item);
  console.log("=====", body);
  contacts[idx] = {
    ...item,
    ...body,
  };

  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
