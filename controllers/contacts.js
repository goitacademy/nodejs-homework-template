const {Contact} = require('../models/contact')
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

 const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
}; 

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

 const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
}; 

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
}; 

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite)
}; 

