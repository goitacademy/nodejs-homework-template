// const contacts = require("../models/contacts");
const { Contacts } = require("../schemas/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (_, res) => {
  const contacts = await Contacts.find({});
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findById(contactId);
  if (!result) throw new HttpError(404, "Not found");
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndRemove(contactId);
  if (!result) throw new HttpError(404, "Not found");
  res.json({
    message: "contact deleted",
  });
};

const addContact = async (req, res) => {
  const result = await Contacts.create(req.body);

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new HttpError(400, "missing fields");
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw new HttpError(404, "not found");
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw new HttpError(404, "not found");
  res.json(result);
};

module.exports = {
  getContactsWr: ctrlWrapper(getContacts),
  getContactByIdWr: ctrlWrapper(getContactById),
  removeContactWr: ctrlWrapper(removeContact),
  addContactWr: ctrlWrapper(addContact),
  updateContactWr: ctrlWrapper(updateContact),
  updateStatusContactWr: ctrlWrapper(updateStatusContact),
};
