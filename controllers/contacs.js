const Contact = require("../models/contact.js");
const { ctrlWrapper, HttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "not found contacts");
  }
  res.status(200).json({ data: result });
};
const addContact = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await Contact.create(req.body);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const result = await Contact.findByIdAndUpdate(contactId, { favorite });
  if (!result) {
    throw HttpError(404, "not found contacts");
  }
  res.status(200).json({ data: result });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
