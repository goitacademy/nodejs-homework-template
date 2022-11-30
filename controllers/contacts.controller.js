const { Contact } = require("../models");
const { createNotFoundHttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filterOptions = favorite
    ? { owner: _id, favorite: favorite }
    : { owner: _id };
  const queryOptions = { skip: skip, limit: Number(limit) };

  const totalCount = await Contact.find(filterOptions).count();

  const contacts = await Contact.find(filterOptions, "", queryOptions).populate(
    "owner",
    "_id email"
  );

  return res.status(200).json({ contacts, page, limit, totalCount });
};

const getContactById = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const filterOptions = { _id: contactId, owner: _id };

  const contact = await Contact.find(filterOptions).populate(
    "owner",
    "_id email"
  );

  if (contact) {
    return res.status(200).json(contact);
  }

  return next(createNotFoundHttpError({ id: contactId }));
};

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  return res.status(201).json(newContact);
};

const removeContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const filterOptions = { _id: contactId, owner: _id };

  const contact = await Contact.findOneAndRemove(filterOptions).populate(
    "owner",
    "_id email"
  );

  if (contact) {
    return res.status(200).json(contact);
  }

  return next(createNotFoundHttpError({ id: contactId }));
};

const updateContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const filterOptions = { _id: contactId, owner: _id };

  const newContact = await Contact.findOneAndUpdate(
    filterOptions,
    { ...req.body },
    { new: true }
  ).populate("owner", "_id email");

  if (newContact) {
    return res.status(200).json(newContact);
  }

  return next(createNotFoundHttpError({ id: contactId }));
};

const updateStatusContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const filterOptions = { _id: contactId, owner: _id };

  const { favorite } = req.body;
  const contact = await Contact.findOneAndUpdate(
    filterOptions,
    { favorite },
    { new: true }
  ).populate("owner", "_id email");

  if (contact) {
    return res.status(200).json(contact);
  }

  return next(createNotFoundHttpError({ id: contactId }));
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
