const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join("db", "contacts.json");

const listContacts = async (req, res, next) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    res.status(200).json(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id !== -1) {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => c.id === id);
      if (!contact) {
        res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json(contact);
      console.log(contact);
      return contact;
    }
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((el) => el.id === contactId);
    const removedContact = contacts.find((el) => el.id === contactId);
    if (contactIndex === -1) {
      console.log(null);
      return;
    }
    contacts.splice(contactIndex, 1);
    console.log(removedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    if (!removedContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      removeContact(contactId);
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
    const result = await fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.status(201).json(result);
    console.log(newContact);
    return newContact;
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
  const contact = contacts.find((el) => el.id === contactId);
  const updatedContact = { ...contact, ...req.body };
  contacts[contactIndex] = updatedContact;
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing fields" });
    }
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    res.status(200).json(updatedContact);
    return updatedContact;
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
