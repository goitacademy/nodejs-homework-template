const express = require('express')
const router = express.Router()
const {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require('../../service/index')

router.get('/', async (req, res, next) => {
  res.json({ message: await listContacts() }).status(200)
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId)
  contact
    ? res.json({ message: contact }).status(200)
    : res.status(404).json({
        code: 404,
        message: `Not found task id`,
        data: 'Not Found',
      })
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  if (!(name && email && phone))
    return res.status(404).json({ message: 'missing required name field' })

  res.json({ message: await addContact(req.body) }).status(200)
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await removeContact(req.params.contactId)
  contact
    ? res.json({ message: contact }).status(200)
    : res.status(404).json({
        code: 404,
        message: `Not found task id`,
        data: 'Not Found',
      })
})

router.put('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body
  if (!(name || email || phone))
    return res.status(400).json({ message: 'missing fields' })

  const contact = await updateContact(req.params.contactId, req.body)

  contact
    ? res.json({ message: contact }).status(200)
    : res.status(404).json({
        code: 404,
        message: `Not found `,
      })
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  const { favorite } = req.body
  if (!favorite)
    return res.status(404).json({ message: 'missing required favorite field' })

  const contact = await updateContact(req.params.contactId, req.body)
  contact
    ? res.json({ message: contact }).status(200)
    : res.status(404).json({
        code: 404,
        message: `Not found `,
      })
})

module.exports = router
