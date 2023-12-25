const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json({ message: "contact deleted" });
};
module.exports = {
  listContact: ctrlWrapper(listContact),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
