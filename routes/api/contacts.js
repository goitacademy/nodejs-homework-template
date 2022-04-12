const express = require('express')
const contactModel = require('../../models/contact')
const router = express.Router()
const {
  schemaAddContact,
  schemaUpdayContact,
} = require('./contact-validation-schemes')
const { validateBody } = require('../../middlewares/validation')

router.get('/', async (req, res, next) => {
  const contacts = await contactModel.listContacts()
  res.json({ status: 'seccess', code: '200', payload: { contacts } })
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactModel.getContactById(req.params.contactId)
  if (contact) {
    return res
      .status(200)
      .json({ status: 'seccess', code: '200', payload: { contact } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: '404', message: 'Not found' })
})

router.post('/', validateBody(schemaAddContact), async (req, res, next) => {
  const contact = await contactModel.addContact(req.body)
  res.status(201).json({ status: 'seccess', code: '201', payload: { contact } })
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactModel.removeContact(req.params.contactId)
  if (contact) {
    return res
      .status(200)
      .json({ status: 'seccess', code: '200', message: 'contact deleted' })
  }
  return res
    .status(404)
    .json({ status: 'error', code: '404', message: 'Not found' })
})

router.put(
  '/:contactId',
  validateBody(schemaUpdayContact),
  async (req, res, next) => {
    const contact = await contactModel.updateContact(
      req.params.contactId,
      req.body,
    )
    if (contact) {
      return res
        .status(200)
        .json({ status: 'seccess', code: '200', payload: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: '404', message: 'Not found' })
  },
)

module.exports = router
