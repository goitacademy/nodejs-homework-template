/* eslint-disable prefer-regex-literals */
const Joi = require("joi");
const { Types } = require("mongoose");
const { HttpCode } = require("../utils");

const createSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone", "favorite");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const regLimit = /\d+/;

const querySchema = Joi.object({
  limit: Joi.string().pattern(regLimit).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("name", "email").optional(),
  sortByDesc: Joi.string().valid("name", "email").optional(),
  filter: Joi.string()
    .pattern(new RegExp("(name|email)\\|?(name|email)+"))
    .optional(),
});

const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
  next();
};

const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: `missing fields`,
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({ message: err.message });
  }
  next();
};

const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: `missing field favorite`,
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({ message: err.message });
  }
  next();
};

const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Invalid ObjectId",
    });
  }
  next();
};

const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, "")}` });
  }
  next();
};

module.exports = {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
};
