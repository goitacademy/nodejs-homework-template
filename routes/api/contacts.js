const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model')

router.get('/', async (req, res, next) => {
  res.status(200).json(listContacts())
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)

  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: 'Not found' })
})

router.post(
  '/',
  body('phone').isLength({ min: 1 }).isMobilePhone(),
  body('email').isEmail(),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const newContact = await addContact(req.body)

    newContact
      ? res.status(201).json(newContact)
      : res.status(400).json({ message: 'missing required name field' })
  }
)

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contactDeleted = await removeContact(contactId)

  contactDeleted
    ? res.status(200).json({ message: 'contact deleted' })
    : res.status(404).json({ message: 'Not found' })
})

router.patch(
  '/:contactId',
  body('phone').isLength({ min: 1 }).isMobilePhone(),
  body('email').isEmail(),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: 'missing fields' })
    }

    const contactUpdated = await updateContact(req.params.contactId, req.body)

    contactUpdated
      ? res.status(200).json(contactUpdated)
      : res.status(404).json({ message: 'Not found' })
  }
)

module.exports = router
