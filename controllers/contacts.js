const {Contact} = require('../models/contact');

const {HttpError, ctrlWrapper} = require("../helpers");

const getListContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
}

const getContactById = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findById(id);
  if(!result){
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
}

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);   
}

const removeContact = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if(!result){
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });          
}

const updateContact = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if(!result){
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);   
}

const updateStatusContact = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
}

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
