import HttpError from "../helpers/http-error.js";
import Contact from "../models/Contact.js";
import {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../models/Contact.js";

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner }, "-updatedAt", {
      skip,
      limit,
    }).populate("owner", "email subscription");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ _id, owner });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({ _id, owner });
    if (!result) {
      throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate({ _id, owner }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateStatusSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  add,
  getById,
  updateContact,
  deleteContact,
  updateStatusContact,
};
