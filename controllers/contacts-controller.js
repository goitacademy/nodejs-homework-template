import Contact from "../models/contact.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

import fs from "fs/promises";
import path from "path";

const posterPath = path.resolve("public", "posters");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 2, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner }
    // { skip, limit }
  ).populate("owner", "name email");
  res.json(result);
};
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact by id=${contactId} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(posterPath, filename);
  await fs.rename(oldPath, newPath);
  const poster = path.join("posters", filename);
  const result = await Contact.create({ ...req.body, poster, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact by id=${contactId} not found`);
  }
  res.json(result);
};
const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact by id=${contactId} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact by id=${contactId} not found`);
  }
  //res.status(204).send(); // при status(204) тіло не повертається
  res.json({ message: "Delete success" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
