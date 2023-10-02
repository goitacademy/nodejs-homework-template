/** @format */

const { Contact } = require("../models/contact");
const { controllerWrapper, HttpError } = require("../helpers");
const onGetAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  if (!favorite) {
    res.json(result);
  } else if (favorite) {
    const favoriteContacts = result.filter(
      (contact) => contact.favorite === true
    );
    res.json(favoriteContacts);
  }
};

const onGetContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOne({ owner, _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const onAddNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const onDeleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOneAndRemove({ owner, _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

const onUpdateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOneAndUpdate({ owner, _id: id }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const body = req.body;
  const bodyIsEmpty = !Object.keys(body).length;
  if (bodyIsEmpty) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const result = await Contact.findOneAndUpdate({ owner, _id: id }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
module.exports = {
  onGetAllContacts: controllerWrapper(onGetAllContacts),
  onGetContactById: controllerWrapper(onGetContactById),
  onAddNewContact: controllerWrapper(onAddNewContact),
  onDeleteContact: controllerWrapper(onDeleteContact),
  onUpdateContact: controllerWrapper(onUpdateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
