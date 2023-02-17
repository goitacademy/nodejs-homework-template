const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} = require("../models/contacts");
const { v4: uuidv4 } = require("node-uuid");

const { addContactSchema, updateContactSchema } = require("../schemas/joi");

const getContacts = async (req, res) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const getOneContact = async (req, res) => {
  try {
    const data = await getContactById(req.params.contactId);
    if (data.length === 0) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const createContact = async (req, res) => {
  try {
    const { error, value } = addContactSchema.validate(req.body);
    console.log(addContactSchema.validate(req.body));
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, phone } = value;
    const contact = { id: uuidv4(), name, email, phone };
    const data = await addContact(contact);
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const deleteContact = async (req, res) => {
  try {
    const contacts = await listContacts();
    if (contacts.every(({ id }) => id !== req.params.contactId)) {
      return res.status(404).json({ message: "Not found" });
    }
    const data = await removeContact(req.params.contactId);
    res.json({
      message: `Contact with ID:${data.id} name:${data.name} deleted!`,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const updateContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (name || email || phone) {
      const { error } = updateContactSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const data = await updateContactById(req.params.contactId, req.body);
      if (!data) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.json(data);
    }
    return res.status(400).json({ message: "Missing required name field" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
module.exports = {
  getContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
};
