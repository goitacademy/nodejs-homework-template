const fs = require('fs/promises')
const path = require("path")
const contactsPath = path.resolve("./models/contacts.json")

const listContacts = async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    res.status(200).send(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).send(contact);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const newContact = {
      id: new Date().getTime().toString(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    res.status(201).send(newContact);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    res.status(201).send(contact);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};