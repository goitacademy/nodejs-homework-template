const Joi = require("joi");
const mongoose = require("mongoose");
const { HttpError, ctrlWrapper } = require("../helpers");
const Contact = require("../models/contacts");

const getAll = async (req, res) => {
  const contacts = await Contact.find().exec();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id");
  }
  const contactOn = await Contact.findById(id);
  if (contactOn) {
    return res.status(200).send(contactOn);
  }
  throw HttpError(404, "Not found");
};

const postContact = async (req, res) => {
  const contactNew = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
    favorite: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const newContact = await Contact.create(contactNew);
  res.status(201).json(newContact);
};

const putById = async (req, res) => {
  const id = req.params.contactId;
  const contactNew = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id");
  }
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(15),
    favorite: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const newContact = await Contact.findByIdAndUpdate(id, contactNew, {
    new: true,
  });
  if (newContact) {
    return res.status(201).send(newContact);
  }
  throw HttpError(404, "Not found");
};

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id");
  }
  const result = await Contact.findByIdAndDelete(id);
  if (result === null) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const contactNew = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: !req.body.favorite,
  };
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id");
  }
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(15),
    favorite: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const newContact = await Contact.findByIdAndUpdate(id, contactNew, {
    new: true,
  });
  if (newContact) {
    return res.status(200).send(newContact);
  }
  throw HttpError(404, "Not found");
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  postContact: ctrlWrapper(postContact),
  deleteById: ctrlWrapper(deleteById),
  putById: ctrlWrapper(putById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
