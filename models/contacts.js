const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");
// console.log("__dirname:", __dirname);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);

  return products;
};

const getContactById = async (contactId) => {
  const products = await listContacts();
  const result = products.find((contact) => contact.id === `${contactId}`);

  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (contactId) => {};

const addContact = async (name, email, phone) => {
  const products = await listContacts();

  const newPoduct = { id: v4(), name, email, phone };
  products.push(newPoduct);

  await fs.writeFile(contactsPath, JSON.stringify(products));

  return newPoduct;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
