const express = require('express')
const router = express.Router()
const contactsOperations = require('../../model/index')
const { contactScheme } = require('../../schemes')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.getAll()
    res.json({
      status: 'success',
      code: 200,
      contacts,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.getById(id)
    if (!result) {
      const error = new Error(`Contact with id=${id} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      result,
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactScheme.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const result = await contactsOperations.add(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      result,
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.removeById(id)
    if (!result) {
      const error = new Error(`Product with id=${id} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Success delete',
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactScheme.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const { id } = req.params
    const result = await contactsOperations.updateById(id, req.body)
    if (!result) {
      const error = new Error(`Product with id=${id} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      result,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
