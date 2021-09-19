const express = require('express')
const router = express.Router()
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
    const number = req.params
    const { contactId } = number.toString()
    console.log(req.params)
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`)
      error.status = 404
      throw error
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Product with id${id} not found`,
      // })
      // return
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

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
