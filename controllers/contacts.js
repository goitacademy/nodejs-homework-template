/* eslint-disable no-unused-vars */
const Joi = require("joi");
const { HttpError, ctrlWrapper } = require("../helpers/index");
const contactSchema = require("../models/contactSchema");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const addShemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});
const getListContact = async (req, res) => {
  const result = await contactSchema.find();
  res.json(result);
};

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactSchema.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = addShema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const result = await contactSchema.create(req.body);
  res.status(201).json(result);
};

const removeByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactSchema.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { error } = addShema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await contactSchema.findByIdAndUpdate(contactId, req.body, {
    new: true,
    select: "-updatedAt -createdAt",
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContactFavorite = async (req, res) => {
  const { error } = addShemaFavorite.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await contactSchema.findByIdAndUpdate(contactId, req.body, {
    new: true,
    select: "-updatedAt -createdAt",
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getListContact: ctrlWrapper(getListContact),
  getByIdContact: ctrlWrapper(getByIdContact),
  updateContact: ctrlWrapper(updateContact),
  removeByIdContact: ctrlWrapper(removeByIdContact),
  addContact: ctrlWrapper(addContact),
  updateContactFavorite: ctrlWrapper(updateContactFavorite),
};
