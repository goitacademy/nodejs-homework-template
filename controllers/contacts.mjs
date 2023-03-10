import {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} from "../models/contacts.mjs";

import { ctrlWrapper } from '../helpers/ctrlWrapper.mjs';
import { HttpError } from "../helpers/HttpError.mjs";

const getAll = async (_, res, next) => {
  try {
    const result = (await listContacts()) ?? [];
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
    const result = await getContactById(contactId);
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
    const result = await removeContact(contactId);
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
    const result = await addContact(req.body);
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
    const result = await updateContact(contactId, req.body);
    if (!result) {
      return next(HttpError(404, "Not found"));
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
