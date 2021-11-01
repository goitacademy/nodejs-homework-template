const contactsOperations = require('../model/contacts')
const { NotFound } = require('http-errors')
const { successResponse } = require('../helpers')

const getAll = async (req, res, next) => {
  try {
    const result = await contactsOperations.getAllContacts()
    successResponse(res, { result })
    // res.json({ contacts })
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'server error',
    // })

    // If the error handler has 4 arguments, then express will pass it to the 1st
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.getContactById(id)
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`)
    }
    successResponse(res, { result })
  } catch (error) {
    next(error)
  }
}

const add = async (req, res, next) => {
  try {
    const { body } = req

    const result = await contactsOperations.addContact(body)

    successResponse(res, { result }, 201)
  } catch (error) {
    next(error)
  }
}

const updateById = async (req, res, next) => {
  try {
    const { body } = req
    const { id } = req.params

    const result = await contactsOperations.updateContactById(id, body)
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`)
    }
    successResponse(res, { result })
  } catch (error) {
    next(error)
  }
}

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.removedContact(id)
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`)
    }

    successResponse(res, { message: 'Success delete' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
}
