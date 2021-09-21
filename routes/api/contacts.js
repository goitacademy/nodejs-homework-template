const express = require('express')
const router = express.Router()
const { contactSchema } = require('../../schemas')
const contactsOperations = require('../../model/contacts')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      message: 'success',
      code: 200,
      data: {
        result: contacts,
      },
      // альтернатива самого просто варианта      res.json({ contacts})
    })
  } catch (error) {
    next(error)
    // Instead of this long res, just write next(error)
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'Server error',
    // })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    // const number = String(req.params)
    // (item.id.toString() === contactId.toString())
    const { contactId } = req.params
    console.log(req.params)
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`)
      error.status = 404
      throw error
      // ======== more correctly write error as we see above
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Product with id${id} not found`,
      // })
      // return
      // ==============================
    }
    res.json({
      message: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

// POST api/products
router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const result = await contactsOperations.addContact(req.body)
    console.log(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`)
      error.status = 404
      throw error
    }

    // если указать res.status(204).json({}) то никакой объект обратно не приходит, какой-бы мы не указали
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact successfully deleted',
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(`Missing fields. ${error.message}`)
      err.status = 400
      throw err
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContact(contactId, req.body)
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      result: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
