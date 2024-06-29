const fs = require("fs/promises");
const path = require("path");
const { addContactSchema, updateContactSchema } = require("./contactSchema");
const contactsPath = path.join(__dirname, "contacts.json");
const generateID = require("generate-unique-id");

const listContacts = async (_, res) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json({ error: "Error DB" });
  }
};

const getContactById = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (contact) => contact.id === req.params.contactId
    );
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({
      contact,
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const removeContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const deleteContact = contacts.filter(
      (contact) => contact.id !== req.params.contactId
    );
    if (contacts.length === deleteContact.length) {
      return res.status(404).json({ message: "Not found" });
    }
    const deleteData = JSON.stringify(deleteContact, null, 2);
    await fs.writeFile(contactsPath, deleteData);
    res.status(200).json({ mensaje: "contacto eliminado" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const addContact = async (req, res) => {
  try {
    const { error, value } = addContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {
      id: generateID(),
      ...value,
    };
    contacts.push(newContact);
    const addData = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, addData);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(404).json({ message: "Error add contact" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { error, value } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === req.params.contactId
    );
    if (contactIndex === -1) {
      return res.status(404).json({ message: "Not found" });
    }

    const updateContact = { ...contacts[contactIndex], ...value };
    contacts[contactIndex] = updateContact;

    const updateData = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, updateData);
    res.status(200).json(updateContact);
  } catch (error) {
    res.status(400).json({ error: "Contact not updated" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
