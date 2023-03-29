const { HttpError } = require("../helpers/index");
const { Contacts } = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contacts.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");
  res.status(200).json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  return res.status(200).json(contact);
};

const postContact = async (req, res, next) => {
  const body = req.body;
  const { _id } = req.user;
  const contact = await Contacts.create({ ...body, owner: _id });
  res.status(201).json(contact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  await Contacts.findByIdAndRemove(contactId);
  res.status(200).json({ message: "contact deleted" });
};

const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const updateContact = await Contacts.findByIdAndUpdate(contactId, body);
  if (!updateContact) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(updateContact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const updateContact = await Contacts.findByIdAndUpdate(contactId, body);
  if (!updateContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(updateContact);
};

module.exports = {
  getContacts,
  getContact,
  postContact,
  deleteContact,
  putContact,
  updateStatusContact,
};
