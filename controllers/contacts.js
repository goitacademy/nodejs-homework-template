const Joi = require("joi");
const path = require("path");
const { httpError, ctrlWrapper } = require("../helpers");
const { Contact } = require(path.resolve(__dirname, "../models/contact"));

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  // const result = await Contact.find({}, { createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const contactId = req.params.contactId; 
  // const result = await Contact.findOne({_id: contactId}, { createdAt: 0, updatedAt: 0 });
  const result = await Contact.findById(
    { _id: contactId },
    { createdAt: 0, updatedAt: 0 }
  );
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  console.log("req.body", req.body);
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
  const removedById = await Contact.findByIdAndDelete(contactId);

  if (!removedById) {
    throw httpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

const updateContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    req.body,
    { new: true, select: "-createdAt -updatedAt" }
  );

  if (!updatedContact) {
    throw httpError(404, "Not found");
  }

  res.json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateContactById: ctrlWrapper(updateContactById),
};
