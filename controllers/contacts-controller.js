import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/HttpError.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../models/Contact.js";

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      return next(HttpError(404, "Not found"));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "Missing fields"));
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      return next(HttpError(404, "Not found"));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactFavoriteSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "Missing field favorite"));
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
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
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      return next(HttpError(404, "Not found"));
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  add,
  updateContact,
  updateStatusContact,
  deleteById,
};
