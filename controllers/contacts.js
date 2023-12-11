const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) throw HttpError(404, "Not found");

    res.status(200).json(result);
};

const addNew = async (req, res) => {
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) throw HttpError(404, "Not found");

    res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const result = await contacts.updateContact(contactId, name, email, phone);

    if (!result) throw HttpError(404, "Not found");
    res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
 