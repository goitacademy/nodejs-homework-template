const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
  // return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact || null;
};

const addContact = async (body) => {
  console.log(body);
  const newContact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((el) => el.id === contactId);
  if (contactIndex !== -1) {
    const newArrContacts = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newArrContacts || null;
  }
  return "Id is not found";
};

const updateContact = async (contactId, body) => {
  const updContact = {
    id: contactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((el) => el.id === contactId);
  if (contactIndex !== -1) {
    contacts.splice(contactIndex, 1, updContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updContact || null;
  }
  return "Id is not found";
};

module.exports = {
  removeContact,
  addContact,
  getContactById,
  listContacts,
  nanoid,
  updateContact,
};
