const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updContact = await updateContact(contactId, req.body);
    if (!updContact) {
      res.status(404).json({ message: "Not found" });
    }
    res.json(updContact);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: `contact deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getById,
  add,
  update,
  remove,
};
