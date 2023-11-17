const { Contact } = require("../models/contact");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const createError = require("../helpers/createError");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;
  const searchOptions = { owner };
  if (favorite) {
    searchOptions.favorite = favorite;
  }
  const result = await Contact.find(searchOptions, "-createdAT -updatedAT", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findById({ _id: contactId, owner });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { name, phoneNumber } = req.body;
  const existingContact = await Contact.findOne({ name, phoneNumber, owner });

  if (existingContact) {
    throw createError(409, "Contact already exists");
  }
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete({ _id: contactId, owner });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw createError(404, "Not found");
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
