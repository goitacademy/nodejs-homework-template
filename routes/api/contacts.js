const express = require('express')
const contactsOperations = require('../../model')
const router = express.Router()

// console.log(contactsOperations)
router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        results: contacts,
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
    const results = await contactsOperations.getContactById(contactId)
    console.log(results)
    res.json({
      status: 'success',
      code: 200,
      data: {
        results: results,
      },
    })
  } catch (error) {}
  // res.json({ message: 'template message' })
})

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.patch('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
