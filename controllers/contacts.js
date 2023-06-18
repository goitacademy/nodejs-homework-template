// const contacts = require("../models/contacts");
const Contact = require("../models/contact")

const { httpError, ctrlWrapper } = require("../helpers");

const listContacts = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw httpError(404, "Not found");
  }

  return res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});

  if (!result) {
    throw httpError(404, "Not found");
  }
  return res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, "Not found");
  }
  return res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
