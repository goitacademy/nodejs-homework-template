import { ctrlErrorWrapper } from "../decorators/index.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/Contact.js";

const NotFoundIdError = (contactId) =>
  HttpError(404, `Contact with ${contactId} not found`);

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = "" } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  if (favorite.length > 0) {
    const isFavorite = favorite === "true";
    const filteredResult = result.filter(
      (item) => item.favorite === isFavorite
    );
    res.json(filteredResult);
  }
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw NotFoundIdError(contactId);
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId });

  if (!result) {
    throw NotFoundIdError(contactId);
  }

  res.json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );

  if (!result) {
    throw NotFoundIdError(contactId);
  }

  res.json(result);
};

export default {
  getAll: ctrlErrorWrapper(getAll),
  getById: ctrlErrorWrapper(getById),
  add: ctrlErrorWrapper(add),
  deleteById: ctrlErrorWrapper(deleteById),
  updateById: ctrlErrorWrapper(updateById),
};
