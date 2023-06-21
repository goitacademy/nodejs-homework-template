const Joi = require("joi");

const contacts = require("../models/contacts");
// const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().max(30).required(),
});

const getAll = async (req, res) => {
  const data = await contacts.listContacts();
  if (!data) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(data);
};

const getById = async (req, res) => {
  const id = req.params;
  const data = await contacts.getById(id);
  if (!data) {
    // throw HttpError(404, "Not found");
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(data);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const data = await contacts.addContact(req.body);
  if (!data) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(201).json(data);
};

const updateById = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const id = req.params;
  console.log(id);
  const data = await contacts.updateContact(id, req.body);
  if (!data) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(201).json(data);
};

const deleteById = async (req, res) => {
  const id = req.params;
  const data = await contacts.removeContact(id);
  if (!data) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(data);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
