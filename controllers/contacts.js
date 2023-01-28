const { Contact } = require("../models/contact");
const RequestError = require("../helpers/RequestError");

const getAllContacts = async (__, res, _) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContactById = async (req, res, _) => {
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(contact);
};

const createContact = async (req, res, _) => {
  const contact = await Contact.create(req.body);

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(201).json(contact);
};

const updateContact = async (req, res, _) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(contact);
};

const updateContactStatus = async (req, res, _) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(contact);
};

const deleteContact = async (req, res, _) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateContactStatus,
  deleteContact,
};
