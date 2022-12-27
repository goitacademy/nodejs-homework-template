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
  const [contactById] = contacts.filter(
    (contact) => contact.id === contactId.toString()
  );
  if (!contactById) {
    return;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts().then((contacts) =>
    contacts.filter((contact) => contact.id !== contactId.toString())
  );
  await fs.writeFile(contactPath, JSON.stringify(contacts));
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
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };

  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
