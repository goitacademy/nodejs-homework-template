const Contact = require("../models/contactModel");

const httpError = require("../utilits/httpError");
const ctrlWrapper = require("../utilits/ctrlWraper");

const getList = async (req, res) => {
  const contactsList = await Contact.find();

  return res.status(200).json({ contactsList });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw httpError(404, "Contact is not found");
  }

  return res.status(200).json(result);
};

const postContact = async (req, res) => {
  const result = await Contact.create(req.body);

  return res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw httpError(404, "Not found");
  }

  return res.status(200).json({ message: "Contact deleted" });
};

const update = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!result) {
    throw httpError(404, "Not found");
  }

  return res.status(200).json(result);
};

module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  postContact: ctrlWrapper(postContact),
  update: ctrlWrapper(update),
  deleteContact: ctrlWrapper(deleteContact),
};