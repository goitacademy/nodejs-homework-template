const express = require('express')
const router = express.Router()

const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require('../../controller/contacts')

router.get('/', async (_, res) => listContactsController(res))

router.get('/:contactId', async (req, res) => getContactByIdController(req, res))

router.post('/', async (req, res) => addContactController(req, res))

router.delete('/:contactId', async (req, res) => removeContactController(req, res))

router.patch('/:contactId', async (req, res) => updateContactController(req, res))

module.exports = router
