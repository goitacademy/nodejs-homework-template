const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find();
  res.json({
    contacts,
  });
};

const getById = async (req, res, next) => {
  const id = req.params["contactId"];
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    contact,
  });
};

const add = async (req, res, next) => {
  const data = req.body;
  const contact = await Contact.create(req.body);
  res.status(201).json({
    contact,
  });
};

const delById = async (req, res, next) => {
  const id = req.params["contactId"];
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "contact deleted",
  });
};

const update = async (req, res, next) => {
  const data = req.body;
  const id = req.params["contactId"];
  const contact = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    contact,
  });
};

const updateFavorite = async (req, res, next) => {
  const data = req.body;
  if (data.favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }
  const id = req.params["contactId"];
  const contact = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    contact,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  delById: ctrlWrapper(delById),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
};
