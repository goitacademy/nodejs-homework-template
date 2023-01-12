const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = favorite ? { owner, favorite } : { owner };

  const data = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit: +limit,
  }).populate("owner", "email subscription");
  res.json({ data, status: 200 });
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw HttpError(404);
  }
  res.json({ data, status: 200 });
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { owner: id } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: id }, req.body, { new: true } );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { owner: id } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: id }, req.body, { new: true } );
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  // const { owner: id } = req.user;
  const bool = await Contact.findOneAndRemove({ _id: contactId });
  console.log(bool);
  if (!bool) {
    throw HttpError(404);
  } else {
    res.status(200).json({ message: "Contact deleted" });
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  postContact: ctrlWrapper(postContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContact: ctrlWrapper(deleteContact),
};
