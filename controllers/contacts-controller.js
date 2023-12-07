// import * as contactService from "../models/index.js"; =======удален=========

import { HttpError } from "../helpers/index.js";
import {
  contactAddScheme,
  contactUpdateScheme,
  contactFavoteSchema,
} from "../models/Contact.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Contact from "../models/Contact.js";

const allContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    // const result = await Contact.findOne({ _id: id });
    throw HttpError(404, `Not found`);
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
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
  const result = await Contact.findByIdAndUpdate(id, req.body, {
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
  const result = await Contact.findByIdAndDelete(id);
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
