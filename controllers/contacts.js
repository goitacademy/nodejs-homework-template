const contacts = require("../models/contacts");
const ctrlWrapper = require('../utils/ctrlWrapper')


const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getById = async (req, res) => {
    const result = await contacts.getById(req.params.id);
    if (result === null) {
      throw HttpError(404);
    }
    res.status(200).json(result);
};

const add = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, (message = "missing fields"));
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById)
};


