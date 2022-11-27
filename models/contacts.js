const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");
// import { nanoid } from 'nanoid'

const contactsPath = path.join(__dirname, "./contacts.json");
// const contactsList = fs.readFile();

async function getContactsList() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

const listContacts = async (_, res) => {
  try {
    const response = await getContactsList();
    return res.json({ response, status: "200" });
  } catch (error) {
    return error;
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contacts = await getContactsList();
    const contactById = contacts.find((item) => item.id === contactId);
    if (!contactById) {
      return res
        .status(404)
        .json({ status: `Contact with id ${contactId} was not found` });
    }
    return res.json({ response: contactById, status: "200" });
  } catch (error) {
    res.status(400).json({ status: error.message });
  }
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contacts = await getContactsList();
    const filteredData = contacts.filter((item) => item.id !== contactId);
    if (filteredData.length === contacts.length) {
      return res
        .status(404)
        .json({ status: `Contact with id ${contactId} was not found` });
    }
    await fs.writeFile(contactsPath, JSON.stringify(filteredData), "utf8");
    return res.json({ status: "200" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const contacts = await getContactsList();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const filteredData = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(filteredData), "utf8");
    return res.json({ data: newContact, status: "201" });
  } catch (error) {
    res.status(400).json({ status: error.message });
  }
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    const contacts = await getContactsList();
    contacts.forEach((item) => {
      if (item.id === contactId) {
        item.name = name ?? item.name;
        item.email = email ?? item.email;
        item.phone = phone ?? item.phone;
      }
    });
    const updatedContact = contacts.find((item) => item.id === contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    return res.json({ data: updatedContact, status: "200" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
