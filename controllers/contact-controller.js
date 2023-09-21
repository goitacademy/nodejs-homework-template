const HttpError = require("../helpers/httpError");
const Contact = require("../models/contactSchema");
const ctrlWrapper = require("../decorators/ctrlWrapper");

const GetAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }
  const result = await Contact.find(filter, null, { skip, limit }).populate(
    "owner",
    "email"
  );
  res.json(result);
};

const GetById = async (req, res) => {
  const { contactId } = req.params;
  const filter = { _id: contactId, owner: req.user._id };
  const data = await Contact.findOne(filter);
  if (!data) {
    throw HttpError(404, "Such contact not found");
  }
  res.json(data);
};

const AddContact = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  res.status(201).json(data);
};
const RemoveContact = async (req, res) => {
  const { contactId } = req.params;
  const filter = { _id: contactId, owner: req.user._id };
  const data = await Contact.findOneAndDelete(filter);
  if (!data) {
    throw HttpError(404, "Such contact not found");
  }

  res.status(200).json({ message: "Deleted" });
};

const UpdateById = async (req, res, next) => {
  const { contactId } = req.params;
  const filter = { _id: contactId, owner: req.user._id };
  const updatedContactById = await Contact.findOneAndUpdate(filter, req.body, {
    new: true,
  });
  if (!updatedContactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContactById);
};

const UpdateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const filter = { _id: contactId, owner: req.user._id };
  const updatedContactById = await Contact.findOneAndUpdate(filter, req.body, {
    new: true,
  });
  if (!updatedContactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContactById);
};

module.exports = {
  GetAll: ctrlWrapper(GetAll),
  GetById: ctrlWrapper(GetById),
  AddContact: ctrlWrapper(AddContact),
  RemoveContact: ctrlWrapper(RemoveContact),
  UpdateById: ctrlWrapper(UpdateById),
  UpdateFavoriteById: ctrlWrapper(UpdateFavoriteById),
};
