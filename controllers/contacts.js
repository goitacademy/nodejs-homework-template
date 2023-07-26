const { HtthError, CtrlWrapper } = require("../helpers");

const Contact = require("../models/contacts");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HtthError(404, "Not found");
  }
  res.json(result);
};

const addContacts = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContacts = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HtthError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateContacts = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HtthError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HtthError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  addContacts: CtrlWrapper(addContacts),
  deleteContacts: CtrlWrapper(deleteContacts),
  updateContacts: CtrlWrapper(updateContacts),
  updateStatusContact: CtrlWrapper(updateStatusContact),
};
