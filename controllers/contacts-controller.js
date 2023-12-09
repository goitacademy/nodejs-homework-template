// import * as contactService from "../models/index.js"; =======удален=========
import Contact from "../models/Contact.js";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const allContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite;
  }
  const result = await Contact.find(filter, " ", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json({ result, total: 4 });
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  // const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndDelete({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({ message: "contact deleted" });
};

export default {
  allContacts: ctrlWrapper(allContacts),
  getContactById: ctrlWrapper(getContactById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  removeContact: ctrlWrapper(removeContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
