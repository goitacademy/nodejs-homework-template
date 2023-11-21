const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 9, favorite } = req.query;
  const skip = (page - 1) * limit;

  const allContacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  if (favorite !== "true") {
    res.json(allContacts);
  } else {
    const filteredFavoriteContacts = allContacts.filter((c) => c.favorite);

    res.json(filteredFavoriteContacts);
  }
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId).populate(
    "owner",
    "email subscription"
  );

  if (!contact) throw HttpError({ status: 404, message: "Not found" });

  res.json(contact);
};

const add = async (req, res) => {
  const { body } = req;
  const { _id: owner } = req.user;

  const contact = await Contact.create({ ...body, owner });

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
