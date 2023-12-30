import createHttpError from 'http-errors'
import { addContact, deleteContact, getContactById, getContacts, updateContactById } from '../models/index.js'

const getAll = async (_, res, next) => {
  try {
    const result = await getContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params
  const result = await getContactById(id)
  if (!result) {
    return next(new createHttpError.NotFound(`Contact with id=${id} not found`))
  }
  res.json(result)
}

const add = async (req, res) => {
  const result = await addContact(req.body)
  res.status(201).json(result)
}

const updateById = async (req, res, next) => {
  const { id } = req.params
  const result = await updateContactById(id, req.body)
  if (!result) {
    return next(new createHttpError.BadRequest(`Contact with id=${id} not found`))
  }
  res.json(result)
}

const deleteById = async (req, res, next) => {
  const { id } = req.params
  const result = await deleteContact(id)
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
