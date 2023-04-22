const Contact = require("../models/contact");
const { HTTPError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HTTPError(404, "Not Found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const body = req.body;
  console.log(body);
  const contact = await Contact.create(body);
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw HTTPError(404, "Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw HTTPError(404, "Not Found");
  }
  res.status(201).json(contact);
};

const updateFavorite = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw HTTPError(404, "Not Found");
  }
  res.status(201).json(contact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
