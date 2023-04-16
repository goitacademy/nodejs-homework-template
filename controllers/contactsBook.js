const { HttpError } = require("../helpers");

const {Contact} = require("../models/contact");
const {ctrlWrapper} = require("../helpers");

const {addSchema, putSchema, updateFavoriteSchema} = require("../models/contact");

const getAll = async (req, res) => {
    const result = await Contact.find() ;
    res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
    const id = req.params.contactId;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(result);
};

const addContact = async (req, res, next) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const result = await  Contact.create(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
    const id = req.params.contactId;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json({ message: "Delete success contact", result });
};

const updateContact = async (req, res, next) => {
    const { error } = putSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }

    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
    if (!result) {
      throw HttpError(404, "missing field favorite");
    }
    res.status(200).json(result);
};

const updateFavorite = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }

  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
