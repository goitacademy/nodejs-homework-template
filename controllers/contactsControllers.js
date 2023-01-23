const {
  contactsList,
  getContactById,
  addContactItem,
  updateContact,
  removeContactById,
} = require("../models/contacts");
const { NotFound } = require("http-errors");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsList();
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      throw new NotFound("Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await addContactItem(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updatePatchContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await updateContact(id, req.body);
    if (!updatedContact) {
      throw new NotFound("Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContactById(id);
    if (!deletedContact) {
      throw new NotFound("Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
  updatePatchContact,
  listContacts,
  getById,
  removeContact,
};
