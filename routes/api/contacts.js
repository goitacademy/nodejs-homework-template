const express = require('express');
const checkId = require('../../controllers/checkId');
const createContact = require('../../controllers/createContact');
const removeContactController = require('../../controllers/deleteContacts');
const getList = require('../../controllers/getList');
const checkMiddlewar = require('../../middleware/checkIdMiddleware');
const express = require('express')
const contacts = require("../../models/contacts")

const router = express.Router();

router.get('/', getList)

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result)
})

router.get('/:id', checkMiddlewar, checkId)

router.post('/', createContact)

router.delete('/:id',checkMiddlewar,removeContactController)

module.exports = router
