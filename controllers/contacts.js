import { Contact } from "../schemas/contacts.js";

import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";

const getAll = async (_, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    if (!result.length) {
      return res.status(404).send("No contacts found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result?.length) {
      return next(HttpError(404, "Not found"));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result?.length) {
      return next(HttpError(404, "Not found"));
    }
    res.json("Contact deleted");
  } catch (error) {
    next(error);
  }
};
const add = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    if (!result?.id) {
      return next(HttpError(400, "Bad request"));
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      return next(HttpError(404, "Not found"));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const updateFavoriteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).send("Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const ctrlGetAll = ctrlWrapper(getAll);
export const ctrlGetById = ctrlWrapper(getById);
export const ctrlAdd = ctrlWrapper(add);
export const ctrlDeleteById = ctrlWrapper(deleteById);
export const ctrlUpdateById = ctrlWrapper(updateById);
export const ctrlUpdateFavorite = ctrlWrapper(updateFavoriteContact);
