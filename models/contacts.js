const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");
const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const dataSting = await fs.readFile(contactPath, "utf8");
  const data = JSON.parse(dataSting);
  return data;
};

const getContactById = async (contactId) => {
  const id = String(contactId);
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === id);
  return contact || null;
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);
  const deleteContact = allContacts[index];
  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactPath, JSON.stringify(allContacts));
  }
  // return deleteContact ? deleteContact : null;
  return deleteContact || null;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = String(contactId);
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { ...body, id };
  await fs.writeFile(contactPath, JSON.stringify(allContacts));
  return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
