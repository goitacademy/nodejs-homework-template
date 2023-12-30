import createHttpError from 'http-errors'
import { Contact } from '../models/Contact.js'

const getAll = async (_, res, next) => {
  try {
    const result = await Contact.find({}, '-createdAt -updatedAt')
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findById(id)
  if (!result) {
    return next(new createHttpError.NotFound(`Contact with id=${id} not found`))
  }
  res.json(result)
}

const add = async (req, res) => {
  const result = await Contact.create(req.body)
  res.status(201).json(result)
}

const updateById = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body)
  if (!result) {
    return next(new createHttpError.BadRequest(`Contact with id=${id} not found`))
  }
  res.json(result)
}

const deleteById = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findByIdAndDelete(id)
  if (!result) {
    return next(new createHttpError.NotFound(`Contact with id=${id} not found`))
  }
  res.json({ message: 'Contact deleted' })
}

export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
}
