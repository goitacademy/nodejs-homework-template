
const { Contact } = require("../models");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
 
  const { _id: owner } = req.user;
  const searchParams = {
    owner,
  };
  
  const { page = 1, limit = 20, favorite, email, name } = req.query;
 
  const skip = (page - 1) * limit;
 
  if (typeof favorite === "undefined") {
    delete searchParams.favorite;
  } else {
    searchParams.favorite = favorite;
  }
    if (typeof email === "undefined") {
    delete searchParams.email;
  } else {
    searchParams.email =email;
  }
  if (typeof name === "undefined") {
    delete searchParams.name;
  } else {
    searchParams.name =name;
  }
  const result = await Contact.find(searchParams, "-createdAt -updatedAt",
    { skip, limit }).populate("owner", "email");
  res.json(result);
};

const addContact = async (req, res) => {

  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndRemove({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Delete success",
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  if (!req.body) throw HttpError(400, "missing field favorite");
  const result = await Contact.findOneAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");

  res.status(201).json(result);
};

module.exports = {
  
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getById: ctrlWrapper(getById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};