const { Contact } = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find({});

  console.log(result);

  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    res.status(404).json({ message: "Not found" });
    // throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // if (Object.keys(body).length === 0) {
  //   res.status(400).json({ message: "missing fields" });
  //   throw HttpError(400, "missing fields");
  // }

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    res.status(404).json({ message: "Not found" });
    // throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    // throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
