import { notFoundHttpError } from '../helpers/NotFoundHttpError.js'
import { Contact } from '../models/Contact.js'

export const getAll = async (req, res, next) => {
  console.log(req.user)
  const { _id: owner } = req.user
  const { page = 1, limit = 20, favorite } = req.query
  const skip = (page - 1) * limit
  const query = { owner }
  if (favorite) {
    query.favorite = true
  }
  try {
    const result = await Contact.find(query, '-createdAt -updatedAt', {
      skip,
      limit,
    }).populate('owner', 'email subscription')
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getById = async (req, res, next) => {
  const { _id: owner } = req.user
  const { id } = req.params
  const result = await Contact.findOne({ owner, _id: id })
  if (!result) return next(notFoundHttpError(`Contact with id=${id} not found`))
  res.json(result)
}

export const add = async (req, res) => {
  const { _id: owner } = req.user
  const result = await Contact.create({ ...req.body, owner })
  res.status(201).json(result)
}

export const updateById = async (req, res, next) => {
  const { _id: owner } = req.user
  const { id } = req.params
  const result = await Contact.findOneAndUpdate({ owner, _id: id }, req.body, { new: true })
  if (!result) return next(notFoundHttpError(`Contact with id=${id} not found`))
  res.json(result)
}

export const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user
  const { id } = req.params
  const result = await Contact.findOneAndDelete({ owner, _id: id })
  if (!result) return next(notFoundHttpError(`Contact with id=${id} not found`))
  res.json({ message: 'Contact deleted' })
}
