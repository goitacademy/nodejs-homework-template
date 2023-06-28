const Contact = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const newContact = await Contact.create({ ...req.body });
  console.log(newContact);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id = ${contactId} not found`);
  }
  res.json({ message: "contact deleted", contactId });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, `Contact with id = ${contactId} not found`);
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
