// const fs = require("fs/promises");
// const path = require("node:path");
// const { v4: uuidv4 } = require("uuid");
// import { nanoid } from 'nanoid'
const Contact = require("../services/schema");

// const contactsPath = path.join(__dirname, "./contacts.json");
// const contactsList = fs.readFile();

const listContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find();
    return res.json({ data: contacts, status: 200 });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contactById = Contact.findById({ _id: id });
    if (contactById) {
      return res.json({ data: contactById, status: 200 });
    } else {
      return res.status(404).json({
        data: `Contact with id ${id}, was not found`,
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const responce = await Contact.findOneAndRemove({ _id: id });
    return res.json({ data: responce, status: 200 });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addContact = async (req, res, next) => {
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
