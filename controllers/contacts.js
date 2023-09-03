const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const body = req.body;
  const result = await Contact.create(body);
  res.status(201).json(result);
};

const del = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const edit = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const editFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  // console.log(favorite);
  const result = await Contact.findByIdAndUpdate(
    contactId,
    {
      favorite,
    },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  del: ctrlWrapper(del),
  edit: ctrlWrapper(edit),
  editFavorite: ctrlWrapper(editFavorite),
};
