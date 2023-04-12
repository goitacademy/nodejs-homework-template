const { ctrlWrapper } = require("../utils");
const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json({ result });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json({ result });
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContactbyID = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json({
    message: `Contact with id: ${contactId} deleted success`,
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactbyID: ctrlWrapper(updateContactbyID),
  deleteContactById: ctrlWrapper(deleteContactById),
};
