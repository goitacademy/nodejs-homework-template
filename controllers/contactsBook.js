const { HttpError } = require("../helpers");

const contacts = require("../models/contacts");
const {ctrlWrapper} = require("../helpers");

const {addSchema, putSchema} = require("../schemas/contacts")

const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
    const id = req.params.contactId;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(result);
};

const addContact = async (req, res, next) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
    const id = req.params.contactId;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json({ message: "Delete success contact", result });
};

const updateContact = async (req, res, next) => {
    const { error } = putSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }

    const id = req.params.contactId;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
