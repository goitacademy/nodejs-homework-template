import { HttpError } from "../helpers/index.js";
import { ContactDB } from "../models/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  console.log("query :>> ", query);
  const skip = (page - 1) * limit;

  const result = await ContactDB.find({ ...query, owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  // console.log("Response length :>> ", Object.keys(result).length);
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactDB.findById(contactId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await ContactDB.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactDB.findByIdAndUpdate(contactId, req.body);
  // const result = await ContactDB.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) throw HttpError(404, "Not found");
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactDB.findByIdAndDelete(contactId);
  if (!result) throw HttpError(404, "Not found");
  // res.status(200).json(result);
  res.status(200).json({ message: "contact deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
