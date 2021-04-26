const express = require('express')
const router = express.Router()
const contacts = require('../../model/index.js');
const file = require('../../model/contacts.json')

router.get('/', async (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
        data: await contacts.listContacts(),
      }
  });
})

router.get('/:contactId', async (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      data: await contacts.getContactById(),
    }
  })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
