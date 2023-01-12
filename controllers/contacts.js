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
  // const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { contactId },
    req.body
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { owner: id } = req.user;
  const bool = await Contact.findOneAndDelete({ contactId, owner: id });
  if (bool === null) {
    res.json({ message: "Not found", status: 404 });
  } else {
    res.json({ message: "Contact deleted", status: 200 });
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  postContact: ctrlWrapper(postContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
