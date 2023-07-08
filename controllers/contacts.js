const { validateBody } = require("../middlewares");
const schema = require("../schemas/addContSchema");
const contrsWrapper = require("../helpers/contrsWrapper");
const Contact = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const getAll = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};
const getById = async (req, res) => {
  const { contactId } = req.params;
  const findedContact = await Contact.findById(contactId);
  if (!findedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(findedContact);
};
const addCont = async (req, res) => {
  validateBody(schema);
  const result = await Contact.create(req.body);
  console.log(result);
  res.status(201).json(result);
};
const updateById = async (req, res) => {
  validateBody(schema);

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
const removeCont = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};
module.exports = {
  getAll: contrsWrapper(getAll),
  getById: contrsWrapper(getById),
  addCont: contrsWrapper(addCont),
  removeCont: contrsWrapper(removeCont),
  updateById: contrsWrapper(updateById),
};
