const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("./models/contacts.json");

const contacts = require("./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [contact] = contacts.filter((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contact));
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  contacts.push({
    id: shortid.generate(),
    name,
    email,
    phone,
  });
  res.status(201).json({ message: "success" });
};

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const { contactId } = req.params;

  const [contact] = contacts.filter((item) => item.id === contactId);

  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }

  contacts.forEach((contact) => {
    if (contact.id === req.params.contactId) contact.name = name;
    contact.email = email;
    contact.phone = phone;
  });

  res.status(200).json({ message: "success" });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
