const Contact = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers/index");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");

  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId).exec();
  console.log(result);
  if (result === null) {
    return res.status(404).send({ message: "Not found" });
    // return res.status(404).json({ message: "Not found" });
    // throw HttpError(404, "Not found! Please enter correct contact ID ");
  }
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json({ message: "Contact deleted!" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found!");
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
