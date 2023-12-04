import Contact from "../models/Contact.js";
import { HttpError } from "../utils/helpers/HttpError.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../utils/validation/contactValidationSchemas.js";

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, ...filterParams } = req.query;
    const skip = (page - 1) * limit;
    const filter = { owner, ...filterParams };

    const result = await Contact.find(filter, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    const total = await Contact.countDocuments(filter);

    res.json({ result, total: total });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findById({ _id: contactId, owner });
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
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
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
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body
    );
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
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body
    );
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
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({ _id: contactId, owner });
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
