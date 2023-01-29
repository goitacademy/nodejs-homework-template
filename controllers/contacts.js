const controlersModule = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await controlersModule.listContacts();
    res.json({
      result: contacts,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await controlersModule.getContactById(contactId);
    if (result === null) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const result = await controlersModule.addContact(req.body);
    res.status(201).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await controlersModule.removeContact(contactId);

    if (result === null) {
      return res.json({ message: `Contact with id=${contactId} not found` });
    }
    res.status(200).json({ status: "success", message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await controlersModule.updateContact(contactId, req.body);
    res.status(200).json({ status: "success", message: "contact update" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
