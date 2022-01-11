import Joi from "joi";
import pkg from "mongoose";
import { MIN_AGE, MAX_AGE } from "../lib/constants";

const { Types } = pkg;

const createSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone", "age");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const querySchema = Joi.object({
  limit: Joi.string().pattern(new RegExp("\\d+")).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("name", "age", "email").optional(),
  sortByDesc: Joi.string().valid("name", "age", "email").optional(),
  filter: Joi.string()
    .pattern(new RegExp("(name|email|age)\\|?(name|email|age)+"))
    .optional(),
});

export const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `field ${err.message.replace(/"/g, "")}` });
  }
  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: "missing fields" });
    }
    return res.status(400).json({ message: err.message });
  }
  next();
};

export const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: "missing fields favorite" });
    }
    return res.status(400).json({ message: err.message });
  }
  next();
};

export const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};

export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `field ${err.message.replace(/"/g, "")}` });
  }
  next();
};
