const Contact = require("../models/contact")

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");

const getAllContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 20, favorite = false} = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({owner}, "", {skip, limit}).populate("owner").all("favorite", favorite);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id)
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const {_id: owner} = req.user
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  // res.json(result)
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
  if (!result) {
    throw HttpError(404);
  }


  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};

