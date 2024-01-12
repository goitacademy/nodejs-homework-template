import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/Contact.js";
import dotenv from "dotenv";
dotenv.config();

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "username");
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found `);
  }
  res.json(result);
};

const addContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContactsById = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const delContactsById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json({ message: "Delete success" });
};

export default {
  getAll: ctrlWrapper(getAllContacts),
  getByID: ctrlWrapper(getContactById),
  add: ctrlWrapper(addContacts),
  updateById: ctrlWrapper(updateContactsById),
  deleteById: ctrlWrapper(delContactsById),
  updateStatus: ctrlWrapper(updateStatusContact),
};
