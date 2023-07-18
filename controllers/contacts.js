
const Contact = require("../models/contact");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpErrors = require("../helpers/HttpErrors");

const getAll = async (req, res, ) => {
  const { _id: owner } = req.user;
  const {page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit;
  const contact = await Contact.find({owner}, {skip,limit}).populate("owner", "email id")
  res.json(contact);
};

const getById = async (req, res, ) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
   throw HttpErrors(404, "Not found")
  }
  res.json(result);
};

const addContact = async (req, res, ) => {
 const {_id: owner} = req.user
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const deletecontact = async (req, res, ) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpErrors(404, "Not found")
  }
  res.json({ message: "Delete success" });
};

const updateContact = async (req, res, ) => {

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpErrors(404, "Not found")
  }
  res.json(result);
};

const updateFavorite = async (req, res, ) => {

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpErrors(404, "Not found")
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deletecontact: ctrlWrapper(deletecontact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
