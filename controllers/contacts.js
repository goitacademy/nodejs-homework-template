const { controllerWrapper, checkId } = require("../helpers");

const { Contact } = require("../models");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  const query = favorite === null ? { owner } : { owner, favorite };
  const result = await Contact.find(query, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription -_id");
  res.json(result);
};

const getById = async (req, res, next) => {
  const result = await Contact.findById(req.params.contactId);
  checkId(result);
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  checkId(result);
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
  checkId(result);
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
  checkId(result);
  res.json(result);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getById: controllerWrapper(getById),
  addContact: controllerWrapper(addContact),
  deleteContact: controllerWrapper(deleteContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
