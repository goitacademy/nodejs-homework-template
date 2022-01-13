import Joi from 'joi';
import pkg from 'mongoose';

const { Types } = pkg;

const createSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone');

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
})

const regLimit = /\d+/
const querySchema = Joi.object({
  limit: Joi.string().pattern(regLimit).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid('name', 'email', 'phone').optional(),
  sortByDesc: Joi.string().valid('name', 'email', 'phone').optional(),
  filter: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('(name|email|age)\\|?(name|email|phone)+'))
    .optional(),
})

export const validateCreate = async (req, res, next) => {
    try {
        const value = await createSchema.validateAsync(req.body)
    } catch (err) {
        return res
            .status(400)
            .json({ message: 'missing required name field' })
    }
    next()
}

export const validateUpdate = async (req, res, next) => {
    try {
        const value = await updateSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.unknown') {
            return res
            .status(400)
            .json({ message: err.message })
        }
        return res
            .status(400)
            .json({ message: 'missing fields' })
    }
    next()
}

export const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ObjectId' })
  }
  next()
}

export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query)
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, '')}` })
  }
  next()
}

export const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'missing field favorite' })
    }
    return res.status(400).json({ message: err.message })
  }
  next()
}