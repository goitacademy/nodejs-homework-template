const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "../models/contacts.json");

// console.log(contacts);

const listContacts = async (req, res, next) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  res.json({ contacts });
  return contacts;
};

const getContactById = async (req, res, next) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const [contactBiId] = contacts.filter((i) => i.id === req.params.id);
  res.json(contactBiId);
};

const removeContact = async (req, res, next) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const newContacts = contacts.filter((i) => i.id !== req.params.id);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
  res.json({ message: `you remove contact ${req.params.id}`, newContacts });
};

const addContact = async (req, res, next) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const { name, email, phone } = req.body;
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  res.json({
    message: `you add contact name: ${name},email: ${email}, phone: ${phone}`,
    contacts,
  });
};

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

  contacts.forEach((i) => {
    if (i.id === req.params.id) {
      i.name = name;
      i.email = email;
      i.phone = phone;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  res.json({ massege: "you Win !!!", contacts });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
