const express = require('express')
const router = express.Router()
const Controller = require('../../model/index')

router.get('/', async (req, res, next) => {
  const list = await Controller.listContacts()
  res.status(200).json(list)
})

router.get('/:contactId', async (req, res, next) => {
  const contacsWithId = await Controller.getContactById(req.params.contactId)
  if (!contacsWithId) {
    res.status(404).json({ message: 'Not found' })
  } else res.status(200).json(contacsWithId)
})

router.post('/', async (req, res, next) => {
  const newContact = await Controller.addContact(req.body)
  if (
    !newContact.id ||
    !newContact.name ||
    !newContact.email ||
    !newContact.phone
  ) {
    res.status(404).json({ message: 'missing required name field' })
  } else res.status(200).json(newContact)
})

router.delete('/:contactId', async (req, res, next) => {
  const ifContactExist = await Controller.removeContact(req.params.contactId)
  if (!ifContactExist) {
    res.status(404).json({ message: 'Not found' })
  } else res.status(200).json({ message: 'contact deleted' })
})

router.patch('/:contactId', async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing fields' })
  }

  const contacsWithId = await Controller.updateContact(
    req.params.contactId,
    req.body
  )

  if (!contacsWithId) {
    res.status(404).json({ message: 'Not found' })
  } else res.status(200).json(contacsWithId)
})

module.exports = router
