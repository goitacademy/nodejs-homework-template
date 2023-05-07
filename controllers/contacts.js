const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");
const { httpError } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const { favorite } = req.query;
  const skip = (page - 1) * limit;
  if (!favorite) {
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    });
    res.json(contacts);
  }
  if (favorite) {
    const boolValue = favorite === "true";
    const contacts = await Contact.find(
      { owner, favorite: { $eq: boolValue } },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    );
    res.json(contacts);
  }
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json(contact);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw httpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
