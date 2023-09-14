const contactFunction = require("../models/contacts");
const addContactSchema = require("../utils/validation/contactValidationSchemas");

const getAll = async (req, res) => {
  const result = await contactFunction.listContacts();
  res.json(result);
};

const getByID = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await contactFunction.getContactById(contactId);
    if (result === null) {
      throw new Error();
    }
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const addContact = async (req, res) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw new Error();
    }
    const result = await contactFunction.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "missing required name field" });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactFunction.removeContact(contactId);
    if (result === null) {
      throw new Error();
    }
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw new Error();
    }
    const { contactId } = req.params;
    const result = await contactFunction.updateContact(contactId, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "missing fields" });
  }
};

module.exports = {
  getAll: getAll,
  getByID: getByID,
  addContact: addContact,
  deleteContact: deleteContact,
  updateContact: updateContact,
};
