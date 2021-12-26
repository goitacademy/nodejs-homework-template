import Joi from 'joi'
import mongoose from 'mongoose'
import { MAX_AGE, MIN_AGE } from '../../lib/constants'
const { Types } = mongoose

const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
})
const updatedSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone', 'age')

const schemaFavorite = Joi.object({
  favorite: Joi.bool().required(),
})
const regLimit = /\d+/

const querySchema = Joi.object({
  limit: Joi.string().pattern(regLimit).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid('name', 'email', 'age', 'phone').optional(),
  sortDesc: Joi.string().valid('name', 'email', 'age', 'phone').optional(),
  filter: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('(name|email|age|phone)\\|?(name|email|age|phone)+'))
    .optional(),
})

export const addValidation = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body)
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Fields &{error.message.replace(/"/g,'')}` })
  }
  next()
}
export const updateValidation = async (req, res, next) => {
  try {
    await updatedSchema.validateAsync(req.body)
  } catch (error) {
    const [{ type }] = error.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'Fields are missing' })
    }
    return res.status(400).json({ message: error.message })
  }
  next()
}
export const updateValidationFavor = async (req, res, next) => {
  try {
    await schemaFavorite.validateAsync(req.body)
  } catch (error) {
    const [{ type }] = error.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'missing field favorite' })
    }
    return res.status(400).json({ message: error.message })
  }
  next()
}

export const validationId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ObjectId' })
  }
  next()
}

export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query)
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Field ${error.message.replace(/"/g, '')}` })
  }
  next()
}
