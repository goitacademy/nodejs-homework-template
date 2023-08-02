
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join("db", "contacts.json");

const listContacts = async (req, res, next) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === id);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json(contact);
      console.log(contact);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((el) => el.id === contactId);
    if (contactIndex === -1) {
      console.log(null);
    } else {
      contacts.splice(contactIndex, 1);
      console.log(contacts[contactIndex]);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      res.status(200).json({ message: "Contact deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      ...req.body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.status(201).json(newContact);
    console.log(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateContact = async (req, res, next) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const { contactId } = req.params;
  const contactIndex = contacts.findIndex((el) => el.id === contactId);
  if (contactIndex === -1) {
    res.status(404).json({ message: "Not Found" });
  } else {
    const updatedContact = { ...contacts[contactIndex], ...req.body };
    contacts[contactIndex] = updatedContact;
    try {
      if (!req.body) {
        res.status(400).json({ message: "Missing fields" });
      } else {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        res.status(200).json(updatedContact);
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Not found" });
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
