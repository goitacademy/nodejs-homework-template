const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model')

const {
  validationAddContact,
  validationUpdateContact,
} = require('../../middlewares/validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()

    return res.status('200')
      .json({ status: 'success', code: '200', data: { contacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)

    return !contact
      ? res.status('404')
        .json({ status: 'error', code: '404', message: 'Not found' })
      : res.status('200')
        .json({ status: 'success', code: '200', data: { contact } })
  } catch (error) {
    next(error)
  }
})

router.post('/', validationAddContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)

    return res.status('201')
      .json({ status: 'success', code: '201', data: { contact } })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)

    if (contact) {
      await removeContact(req.params.contactId)
      return res.status('200')
        .json({
          status: 'success',
          code: '200',
          message: `contact ID:${contact.id} deleted`
        })
    } else {
      return res.status('404')
        .json({ status: 'error', code: '404', message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)

    return !contact
      ? res.status('404')
        .json({ status: 'error', code: '404', message: 'Not found' })
      : res.status('200')
        .json({ status: 'success', code: '200', data: { contact } })
  } catch (error) {
    next(error)
  }
})

module.exports = router
