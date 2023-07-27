import { Contact } from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { CtrlWrapper } from "../decorators/index.js";

// * Get ALL
const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

// * Get by ID
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById({ _id: contactId });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

// * Post NEW
const add = async (req, res) => {
  const result = await Contact.create(req.body);
  if (!result) throw HttpError(404, "missing required name field");
  res.status(201).json(result);
};

// * Delete
const removeById = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId);
  if (!result) throw HttpError(404);
  res.json({ message: "contact deleted" });
};

// *Update
const updateById = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

// *Update Favorite
const updateFavorite = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

export default {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  add: CtrlWrapper(add),
  updateById: CtrlWrapper(updateById),
  updateFavorite: CtrlWrapper(updateFavorite),
  removeById: CtrlWrapper(removeById),
};
