/** @format */
const { Contact } = require("../models/contact");

const { controllerWrapper, HttpError } = require("../helpers");

const onGetAllContacts = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const onGetContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const onAddNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const onDeleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

const onUpdateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const bodyIsEmpty = !Object.keys(body).length;
  if (bodyIsEmpty) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  onGetAllContacts: controllerWrapper(onGetAllContacts),
  onGetContactById: controllerWrapper(onGetContactById),
  onAddNewContact: controllerWrapper(onAddNewContact),
  onDeleteContact: controllerWrapper(onDeleteContact),
  onUpdateContact: controllerWrapper(onUpdateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
