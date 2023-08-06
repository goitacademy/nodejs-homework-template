const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const contactsPath = require("path").join(
  __dirname,
  "../../models/contacts.json"
);

const listContacts = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    });

    const { error } = schema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeContact = async (req, res) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Not found" });
    }

    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contactId = req.params.id;

    if (!name && !email && !phone) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return res.status(404).json({ message: "Not found" });
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (phone) updatedFields.phone = phone;

    const updatedContact = { ...contacts[index], ...updatedFields };
    contacts[index] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
