// const contacts = require("../models/contacts");
const {Contact} = require('../models/contact')
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.params);
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
   const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
   const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
 

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};




const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
 const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
 if (!result) {
   throw HttpError(404, "Not found");
 }
 res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite)
  
};
