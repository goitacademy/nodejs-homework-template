const contactsServisce = require("../models/contacts");

const { ctrlWrapper } = require("../decorators/ctrlWrapper");

const getAllContacts = async (req, res, next) => {
  const result = await contactsServisce.listContacts();
  res.json(result);
};

const getContactId = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServisce.getContactById(id);
  if (!result) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsServisce.addContact(req.body);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServisce.removeContact(id);
  if (!result) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServisce.updateContact(id, req.body);

  if (!result) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactId: ctrlWrapper(getContactId),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
