const { Contact } = require("../models");

const { ApiError, decorCtrWrapper } = require("../utils");

const getAll = async (_, res) => {
  const response = await Contact.find();

  res.json({ data: response });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const response = await Contact.findById(contactId);

  if (!response) throw ApiError(404, "Not found");
  res.json({ data: response });
};

const add = async (req, res) => {
  const { body } = req;

  const response = await Contact.create(body);

  res.status(201).json({ data: response });
};

const editById = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const response = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!response) throw ApiError(404, "Not found");

  res.json({ data: response });
};

const updateStatusContact = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const response = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!response) throw ApiError(404, "Not found");

  res.json({ data: response });
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const response = await Contact.findByIdAndDelete(contactId);

  if (!response) throw ApiError(404, "Not found");
  res.json({ message: "contact deleted" });
};

module.exports = {
  getAll: decorCtrWrapper(getAll),
  getById: decorCtrWrapper(getById),
  add: decorCtrWrapper(add),
  editById: decorCtrWrapper(editById),
  deleteById: decorCtrWrapper(deleteById),
  updateStatusContact: decorCtrWrapper(updateStatusContact),
};
