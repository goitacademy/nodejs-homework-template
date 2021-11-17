const express = require('express')
const router = express.Router()
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../model')

router.get('/', async (_, res) => {
  const contacts = await listContacts()
  res.json({
    status: 'Success',
    code: 200,
    data: { result: contacts },
  })
})

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)
  if (!contact.length) res.status(404).send({ message: 'Not found' })
  res.json({
    status: 'Success',
    code: 200,
    data: { result: contact },
  })
})

router.post('/', async (req, res) => {
  const body = req.body
  let message = ''

  if (!body.name) message = "missing required 'name' data"
  if (!body.email) message = "missing required 'email' data"
  if (!body.phone) message = "missing required 'phone' data"
  if (message) {
    res.status(400).send({ error: message })
    return
  }
  const newContact = await addContact(body)
  if (newContact.message) {
    res.status(400).send({ error: newContact.message })
    return
  }
  res.json({
    status: 'Created',
    code: 201,
    data: { result: newContact },
  })
})

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params
  const error = await removeContact(contactId)
  if (error.message) {
    res.status(404).send({ message: error.message })
    return
  }
  res.json({
    status: 'Success',
    code: 200,
    data: { message: 'contact deleted' },
  })
})

router.patch('/:contactId', async (req, res) => {
  const body = req.body
  const { contactId } = req.params

  if (!body.name || !body.email || !body.phone || !contactId) {
    res.status(400).send({ message: 'missing fields' })
    return
  }
  const patchedContact = await updateContact(contactId, body)
  if (patchedContact.message) {
    const code = patchedContact.message === 'Not found' ? 404 : 400
    res.status(code).send({ error: patchedContact.message })
    return
  }
  res.json({
    status: 'Updated',
    code: 200,
    data: { result: patchedContact },
  })
})

module.exports = router
