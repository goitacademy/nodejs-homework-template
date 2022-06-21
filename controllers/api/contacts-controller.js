const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async (req, res) => {
  const contacts = await fs.readFile(contactsPath, "utf8");

  return res.status(200).json({ contact: JSON.parse(contacts) });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const contact = contacts.find(({ id }) => id === contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json({ contact });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const newContacts = contacts.filter(({ id }) => id !== contactId);

  if (contacts.length === newContacts.length) {
    return res.status(404).json({ message: "Not found" });
  }

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const newContact = {
    id: String(Date.now()),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return res.status(201).json({ contact: newContact });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }

  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));

  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = name ? name : contact.name;
      contact.email = email ? email : contact.email;
      contact.phone = phone ? phone : contact.phone;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  const contact = contacts.find(({ id }) => id === contactId);
  return res.status(200).json({ contact });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
