const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("colors");

const contactsPath = path.join(__dirname, "contacts.json");

const parsedContact = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContact = JSON.parse(contacts);
  return parsedContact;
};

const listContacts = async (req, res) => {
  try {
    const contacts = await parsedContact();
    return res.status(200).json(contacts);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contacts = await parsedContact();
  const getContact = contacts.find(({ id }) => id === contactId);
  if (getContact) {
    res.status(200).json(getContact);
  } else {
    res.status(404).json({ message: `Not found` });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await parsedContact();
    const contactToRemove = contacts.find(({ id }) => id === contactId);
    if (!contactToRemove) {
      return res.status(404).json({ message: `Not found contact` });
    }
    const newContactList = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), {
      encoding: "utf-8",
    });
    res.status(200).json({ message: `Contact deleted` });
  } catch (error) {
    console.log(`Oops, something wrong: ${error.message}`.red);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contacts = await parsedContact();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
      encoding: "utf-8",
    });

    if (newContact) {
      res.status(201).json(newContact);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contacts = await parsedContact();
    const contactForUpdate = contacts.find(({ id }) => id === contactId);
    if (!contactForUpdate) {
      res
        .status(404)
        .json({ message: `Contact with id: ${contactId}, not found` });
    }
    const contactList = contacts.filter(({ id }) => id !== contactId);
    const updatedContact = { ...contactForUpdate, ...req.body };
    const newContactList = [...contactList, updatedContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), {
      encoding: "utf-8",
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(`Oops, something wrong: ${error.message}`.red);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
