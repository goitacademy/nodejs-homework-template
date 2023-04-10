const Joi = require("joi");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/HttpError");
const {
  getContactById,
  // addContact,
  listContacts,
  // updateContact,
  removeContact,
} = require("../models/contacts");

const addingSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
//
const getList = async (req, res) => {
  const result = await listContacts();
  if (!result) {
    throw HttpError(404, "Contacts not found");
    // res.status(404).json({ message: "Not Found" });
  }
  res.status(200).json(result);
};
//
const getById = async (req, res) => {
  console.log(req.params.contactId);
  const result = await getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
    // res.status(404).json({ message: "Not Found" });
  }
  res.status(200).json(result);
};
//
const add = async (req, res) => {
  const { error } = addingSchema.validate(req.body);
  console.log(error);
  if (error) {
    res.status(400).json({ error: error.message });
  }
  res.status(201).json({ message: "created" });
};
//
const removeById = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Contact not found");
    // res.status(404).json({ message: "Not Found" });
  }
  res.status(200).json({
    data: result,
    message: "Deleted",
  });
};
//
const updateById = async (req, res) => {
  res.json({ message: "template message" });
};

module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
