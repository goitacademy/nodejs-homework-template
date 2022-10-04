const fs = require("fs/promises");
const path = require("path");

const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);

  return products;
};

const contactById = async (contactId) => {
  const products = await listContacts();
  const result = products.find((contact) => contact.id === `${contactId}`);

  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (contactId) => {
  const products = await listContacts();
  const isIdForDelete = products.some((product) => product.id === contactId);

  if (!isIdForDelete) {
    return null;
  }

  const newListContacts = products.filter(
    (contact) => contact.id !== `${contactId}`
  );

  await fs.writeFile(contactsPath, JSON.stringify(newListContacts));

  return newListContacts;
};

const addContact = async (name, email, phone) => {
  const products = await listContacts();
  const newPoduct = { id: v4(), name, email, phone };
  products.push(newPoduct);

  await fs.writeFile(contactsPath, JSON.stringify(products));

  return newPoduct;
};

const updateContact = async (contactId, name, email, phone) => {
  const products = await listContacts();
  const idx = products.findIndex((product) => product.id === contactId);

  if (idx === -1) {
    return null;
  }

  products[idx] = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(products));

  return products[idx];
};

module.exports = {
  listContacts,
  contactById,
  removeContact,
  addContact,
  updateContact,
};
