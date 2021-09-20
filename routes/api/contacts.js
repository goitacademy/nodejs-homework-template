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
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
