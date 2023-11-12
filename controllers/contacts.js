const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const allContacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) throw HttpError({ status: 404, message: "Not found" });

  res.json(contact);
};

const add = async (req, res) => {
  const { body } = req;

  const contact = await Contact.create(body);

  res.status(201).json(contact);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) throw HttpError({ status: 404, message: "Not found" });

  res.json(contact);
};

const updateById = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!updatedContact) throw HttpError({ status: 404, message: "Not found" });

  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!updatedContact) throw HttpError({ status: 404, message: "Not found" });

  res.json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
