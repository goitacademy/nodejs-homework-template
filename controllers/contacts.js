const { Contact } = require("../models/contact");
const { ctrlsWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  return res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact deleted" });
};

const addContact = async (req, res, next) => {
  const { body } = req;
  const result = await Contact.create(body);
  return res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(contactId, body);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlsWrapper(listContacts),
  getContactById: ctrlsWrapper(getContactById),
  removeContact: ctrlsWrapper(removeContact),
  addContact: ctrlsWrapper(addContact),
  updateContact: ctrlsWrapper(updateContact),
  updateStatusContact: ctrlsWrapper(updateStatusContact),
};
