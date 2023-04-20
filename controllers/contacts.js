const { controllerWrapper, checkId } = require("../helpers");

const { Contact } = require("../models");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...params } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, ...params }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription -_id");
  res.json(result);
};

const getById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: req.params.contactId, owner });
  checkId(result);
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: req.params.contactId, owner });
  checkId(result);
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: req.params.contactId, owner }, req.body, { new: true });
  checkId(result);
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: req.params.contactId, owner }, req.body, { new: true });
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
