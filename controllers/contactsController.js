const { HttpError } = require("../helpers");
const { Contact } = require("../models/contacts");

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  return res.json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return res.json(contact);
};

const postContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  return res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  await Contact.findByIdAndRemove(contactId);
  return res.status(200).json({ message: "contact deleted" });
};

const putContact = async (req, res, next) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }

  return res.status(200).json(updatedContact);
};

module.exports = {
  getContacts,
  getContact,
  postContact,
  deleteContact,
  putContact,
};
