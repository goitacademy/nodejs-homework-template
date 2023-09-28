const Contact = require("../models/userModel");

const errorHandler = require("../utilits/errorHandler");
const ctrlWrapper = require("../utilits/ctrlWraper");

const getList = async (req, res) => {
  const contactsList = await Contact.find();
  res.status(200).json({ contactsList });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  errorHandler(404, "Not found");
  res.status(200).json(result);

  if (!result) {
    throw errorHandler(404, "Contact is not found");
  }
};

const postContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw errorHandler(404, "Not found");
  }

  res.status(200).json({ message: "Contact deleted" });
};

const update = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  res.status(200).json(result);

  if (!result) {
    throw errorHandler(404, "Not found");
  }
};



module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  postContact: ctrlWrapper(postContact),
  update: ctrlWrapper(update),
  deleteContact: ctrlWrapper(deleteContact),
};
