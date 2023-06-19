const { TryCatchWrapper, HTTPError } = require("../utils");

const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
  const data = await Contact.find();
  res.json(data);
};

const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw HTTPError(404, "Not found");
  }
  res.json(data);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndRemove(contactId);
  if (!data) {
    throw HTTPError(404, "Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const changeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw HTTPError(404, "Not found");
  }
  res.json(data);
};
const updateStatusContact  = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw HTTPError(404, "Not found");
  }
  res.json(data);
};

module.exports = {
  getAll: TryCatchWrapper(getAll),
  getById: TryCatchWrapper(getById),
  deleteContact: TryCatchWrapper(deleteContact),
  changeContact: TryCatchWrapper(changeContact),
  addContact: TryCatchWrapper(addContact),
  updateStatusContact: TryCatchWrapper(updateStatusContact),
};
