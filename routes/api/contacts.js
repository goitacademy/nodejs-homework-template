const express = require('express')
const router = express.Router()
const {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require('./utils')
const { auth } = require('./middleware/auth.js')

router.get('/', async (req, res, next) => {
  res.json({ message: await listContacts() }).status(200)
})

router.get('/:contactId', auth, async (req, res, next) => {
  const { _id: owner } = req.user

  const contact = await getContactById(req.params.contactId, owner)
  contact
    ? res.json({ message: contact }).status(200)
    : res.status(404).json({
        code: 404,
        message: `Not found task id`,
        data: 'Not Found',
      })
})

router.post('/', auth, async (req, res, next) => {
  const { name, email, phone } = req.body
  const { _id: owner } = req.user

  if (!(name && email && phone))
    return res.status(404).json({ message: 'missing required name field' })

  res.json({ message: await addContact({ ...req.body, owner }) }).status(200)
})

router.delete('/:contactId', auth, async (req, res, next) => {
  const { _id: owner } = req.user

  const contact = await removeContact(req.params.contactId, owner)
  contact
    ? res.json({ message: contact }).status(200)
    : res.status(404).json({
        code: 404,
        message: `Not found task id`,
        data: 'Not Found',
      })
})

router.put('/:contactId', auth, async (req, res, next) => {
  const { name, email, phone } = req.body
  const { _id: owner } = req.user

  if (!(name || email || phone))
    return res.status(400).json({ message: 'missing fields' })

  const contact = await updateContact(req.params.contactId, req.body, owner)

  contact
    ? res.json({ message: contact }).status(200)
    : res.status(404).json({
        code: 404,
        message: `Not found `,
      })
})

router.patch('/:contactId/favorite', auth, async (req, res, next) => {
  const { favorite } = req.body
  const { _id: owner } = req.user

  if (!favorite)
    return res.status(404).json({ message: 'missing required favorite field' })

  const contact = await updateContact(req.params.contactId, req.body, owner)
  contact
    ? res.json({ message: contact }).status(200)
    : res.status(404).json({
        code: 404,
        message: `Not found `,
      })
})

module.exports = router
