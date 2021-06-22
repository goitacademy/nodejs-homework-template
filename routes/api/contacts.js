const express = require('express')
const router = express.Router()
const { validateCreateContact, validateUpdateContact } = require('./validation')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../model/index')

// router.get('/', async (req, res) => {
//   console.log('h1')
//   res.json({
//     message: 'nothing',
//   })
// })

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const idx = req.params.contactId
    const result = await getContactById(idx)
    if (!result) {
      res.json({
        status: 404,
        message: 'Not found',
      })
    }
    res.json({
      status: 'success',
      code: 200,
      data: result,
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', validateCreateContact, async (req, res, next) => {
  // console.log(req.body)
  const newContact = await addContact(req.body)
  res.json({
    status: 'success',
    code: 201,
    data: newContact,
  })
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const idx = req.params.contactId
    const data = await removeContact(idx)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validateUpdateContact, async (req, res, next) => {
  const { contactId } = req.params
  const { body } = req
  if (!body) {
    res.json({ message: 'missing fields', status: 400 })
  }
  const updatedContact = await updateContact(contactId, body)
  res.json({ status: 'success', code: 200, newContact: updatedContact })
})

module.exports = router
