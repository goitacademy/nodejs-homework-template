// import {
//   listContacts,
//   getById,
//   removeContact,
//   addContact,
//   updateContact,
// } from "../models/contacts.js";

import Book from "../models/contact.js";

import { HttpError, ctrlWrapper } from "../helpers/index.js";

const getAll = async (req, res, next) => {
  const allContacts = await Book.find();
  res.json(allContacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Book.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Book.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Book.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const emptyBody = !Object.keys(req.body).length;
  if (emptyBody) {
    throw HttpError(400, "missing fields");
  }

  const { contactId } = req.params;

  const result = await Book.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const emptyBody = !Object.keys(req.body).length;
  if (emptyBody) {
    throw HttpError(400, "missing field favorite");
  }

  const { contactId } = req.params;

  const result = await Book.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
