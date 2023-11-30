import Contact from "../models/Contact.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...filterParams } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner, ...filterParams };

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  const total = await Contact.countDocuments(filter);

  res.json({
    result,
    total,
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  try {
    const result = await Contact.findById({ _id: id, owner });
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: id, owner },
      req.body
    );

    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  try {
    const result = await Contact.findByIdAndDelete({ _id: id, owner });
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

const updateIsFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { error } = contactFavoriteSchema.validate(req.body);

  try {
    if (error) {
      throw HttpError(400, error.message);
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body);
    if (!updatedContact) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateIsFavorite: ctrlWrapper(updateIsFavorite),
};
