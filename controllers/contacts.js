const Contacts = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers/index");

async function listContacts(req, res) {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contacts.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(data);
}

async function getContactById(req, res) {
  const id = req.params.contactId;
  const data = await Contacts.findOne({ _id: id });
  if (!data) {
    throw HttpError(404, "Not found!");
  }
  res.json(data);
}

async function addContact(req, res) {
  const { _id: owner } = req.user;
  const data = await Contacts.create({ ...req.body, owner });
  res.json(data);
}

async function removeContact(req, res) {
  const id = req.params.contactId;
  const data = await Contacts.findByIdAndDelete(id);
  console.log(data);
  if (!data) {
    throw HttpError(404, "Not found!");
  }
  res.json({ message: "contact deleted" });
}

async function updateContact(req, res) {
  const id = req.params.contactId;
  const data = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404, "Not found!");
  }

  res.json(data);
}

async function updateFavorite(req, res) {
  const id = req.params.contactId;
  const data = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404, "Not found!");
  }

  res.json(data);
}

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
