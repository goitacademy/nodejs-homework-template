const { Contact } = require("../models/contact.js");

const { HttpError, ctrlWrapper } = require("../helpers/index.js");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 2, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  const search = { owner };

  if (favorite !== null) {
    search.favorite = favorite;
  }
  const result = await Contact.find(search, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId).select(
    "-createdAt -updatedAt"
  );
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  const updatedResult = await Contact.findById(result._id).select(
    "-createdAt -updatedAt"
  );
  res.status(201).json(updatedResult);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).select("-createdAt -updatedAt");
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).select("-createdAt -updatedAt");
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) throw HttpError(404, "Not found");
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
