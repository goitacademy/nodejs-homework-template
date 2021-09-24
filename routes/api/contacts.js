const express = require('express')
const contactsOperations = require('../../model')
const { contactSchema } = require('../../model/schemas')
const router = express.Router()

// console.log(contactsOperations)
router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    })
  } catch (error) {
    next(error)
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'Server error',
    // })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    // console.log(result)
    if (!result) {
      const error = new Error(`Contact ID${contactId} not found`)
      error.status = 404
      throw error
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Contact ID${contactId} not found`,
      // })
      // return
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: result,
      },
    })
  } catch (error) {
    next(error)
  }
  // res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'seccess',
      code: 201,
      data: {
        result,
      },
    })
    console.log(req.body)
  } catch (error) {
    next(error)
  }
  // res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateById(contactId, req.body)
    if (!result) {
      const error = new Error(`Contact ID${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: result,
      },
    })
  } catch (error) {
    next(error)
  }
})
// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.patch('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
