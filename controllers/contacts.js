const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query
  const skip = (page-1) * limit

  const data = await Contact
    .find({ owner }, "-createdAt -updatedAt", {skip, limit})
    .populate("owner");
  res.json({ data, status: 200 });
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw HttpError(404);
  }
  res.json({ data, status: 200 });
};

const postContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const bool = await Contact.findByIdAndDelete(contactId);
  if (bool === null) {
    res.json({ message: "Not found", status: 404 });
  } else {
    res.json({ message: "Contact deleted", status: 200 });
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  postContact: ctrlWrapper(postContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
