const express = require('express')
const router = express.Router()
const { validateCreateContact, validateUpdateContact } = require('./validation')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controller')

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
    const result = await removeContact(idx)
    res.status(200).json({
      result,
    })
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

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    if (!favorite) {
      res.status(400).json({ message: 'missing field favorite' })
    }
    const data = await updateStatusContact(contactId, req.body)
    res.status(200).json({ data })
  } catch (error) {
    res.status(404).json({ message: 'Not found' })
  }
})

module.exports = router
