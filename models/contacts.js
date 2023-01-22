const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");
const contactPath = path.resolve("./models/contacts.json");

const getContacts = async () => {
  const data = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const contactById = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const remainingContacts = contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  await fs.writeFile(contactPath, JSON.stringify(remainingContacts));
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  const contacts = await getContacts();
  contacts.push(contact);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getContacts();
  const contact = contacts.find((item) => item.id === contactId);
  contact.name = body.name;
  contact.email = body.email;
  contact.phone = body.phone;
  if (!contact) {
    return null;
  }
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
