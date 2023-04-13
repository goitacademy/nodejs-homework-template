const { ctrlWrapper } = require("../utils");
const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const {_id: owner} = req.user;
 const {page = 1, limit = 10} = req.query;
 const skip = (page - 1)*limit;
  const result = await Contact.find({owner},"-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact  with ${id} not found`);
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact  with ${id} not found`);
  }
  res.status(200).json(result);
};
const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact  with ${id} not found`);
  }
  res.status(200).json(result);
};
const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact  with ${id} not found`);
  }
  res.status(201).json({
    message: "Delete success",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
