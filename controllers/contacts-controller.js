import Contact from "../models/Contact.js";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { id: owner } = req.user;

  const { page = 1, limit = 20, favorite = false } = req.query;

  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner })
    .skip(skip)
    .limit(limit)
    .populate("owner", "email");

  if (favorite === "true") {
    const filteredContacts = result.filter(
      (contact) => contact.favorite === true
    );
    res.json(filteredContacts);
  } else {
    res.json(result);
  }
};

const getById = async (req, res) => {
  const { id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOne({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const add = async (req, res) => {
  const { id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndDelete({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: "contact deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
