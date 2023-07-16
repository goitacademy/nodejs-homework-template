const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
    const data = await contacts.listContacts();
    res.json(data);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const data = await contacts.getContactById(contactId);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
};

const addOne = async (req, res) => {
    const data = await contacts.addContact(req.body);
    res.status(201).json(data);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const data = await contacts.removeContact(contactId);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const data = await contacts.updateContact(contactId, req.body);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addOne: ctrlWrapper(addOne),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
