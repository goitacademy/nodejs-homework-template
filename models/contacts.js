const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname,"./contacts.json");


async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);
  return products;
}

async function getContactById(contactId) {
  const products = await listContacts();
  const result = products.find((item) => item.id === contactId);

  return result || null;
}

async function removeContact(contactId) {
  const products = await listContacts();
  const idx = products.find((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newProducts = products.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newProducts));
  return products[idx];
}

const updateById = async(id, body)=> {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if(index === -1){
      return null;
  }
  contacts[index] = {id, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContacts = { id: v4(), ...body };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};