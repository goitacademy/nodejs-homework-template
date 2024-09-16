const Contact = require("../models/contacts");

const { ctrlWrapper } = require("../decorators/ctrlWrapper");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find({}, "phone");

  res.json(result);
};

const getContactId = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id);
  if (!result) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    return res.status(400).json({
      message: "missing field favorite",
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
  updateFavorite: ctrlWrapper(updateFavorite),
};
