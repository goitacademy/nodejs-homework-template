

const { HttpError } = require("../helpers");

const contacts = require("../models/contacts");
const ctrlWrraper = require("../helpers/ctrlWrraper")



const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      message: "contact deleted",
    });
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};

module.exports = {
  getAll: ctrlWrraper(getAll),
  getById: ctrlWrraper(getById),
  addContact: ctrlWrraper(addContact),
  deleteById: ctrlWrraper(deleteById),
  updateById: ctrlWrraper(updateById),
};
