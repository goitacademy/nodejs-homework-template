import Contacts from "../models/contacts.js";
import Joi from "joi";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

const movieUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  // const condition = { owner };
  // if (favorite) {
  //   condition.favorite = favorite
  // } else {
  //   condition
  // }

  const condition = favorite ? { owner, favorite } : { owner };

  const result = await Contacts.find(condition, "-cratedAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contacts.findById({ _id: contactId });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { error } = contactsAddSchema.validate(req.body);
  const { _id: owner } = req.user;
  // console.log(error.message);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contacts.create({ ...req.body, owner });
  res.status(201).json(result);
};

const delleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  const { length } = Object.keys(req.body);

  if (length === 0) {
    throw HttpError(400, "missing field");
  }
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (result === null) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  const { length } = Object.keys(req.body);

  if (length === 0) {
    throw HttpError(400, "missing field favorite");
  }
  const { error } = movieUpdateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }

  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (result === null) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  delleteById: ctrlWrapper(delleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
