import { notFoundHttpError } from '../helpers/NotFoundHttpError.js'
import { Contact } from '../models/Contact.js'

export const getAll = async (_, res, next) => {
  try {
    const result = await Contact.find({}, '-createdAt -updatedAt')
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getById = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findById(id)
  if (!result) return next(notFoundHttpError(`Contact with id=${id} not found`))
  res.json(result)
}

export const add = async (req, res) => {
  const result = await Contact.create(req.body)
  res.status(201).json(result)
}

export const updateById = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body)
  if (!result) return next(notFoundHttpError(`Contact with id=${id} not found`))
  res.json(result)
}

export const deleteById = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findByIdAndDelete(id)
  if (!result) return next(notFoundHttpError(`Contact with id=${id} not found`))
  res.json({ message: 'Contact deleted' })
}
