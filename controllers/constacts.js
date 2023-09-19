const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../utils/index");

const getAll = async (req, res) => {
  
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findOne({ _id: id });
  if (!contact) {
    throw HttpError(404, "Contact not found");
  }

  res.status(200).json(contact);
};

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  if (Object.keys(req.body).length < 2) {
    return res.status(400).json({ message: `missing fields` });
  }

  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

const updateFavorite = async (req, res) => {

  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
