import { Contact } from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { CtrlWrapper } from "../decorators/index.js";

// * Get ALL
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const conditions = { owner };
  if (favorite === "true") conditions.favorite = true;

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
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
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
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
const updateStatusContact = async (req, res, next) => {
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
  updateStatusContact: CtrlWrapper(updateStatusContact),
  removeById: CtrlWrapper(removeById),
};
