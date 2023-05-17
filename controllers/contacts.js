const { Contact } = require("../models/contacts");
const { HttpErrors } = require("../helpers");

const getAll = async (req, res) => {
  console.log(Contact);
  const result = await Contact.find({});
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpErrors(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpErrors(404);
  }
  res.status(200).json(result);
};
const updateContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpErrors(404);
  }
  res.status(201).json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
};
