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

router.get(`/:contactId`, async (req, res, next) => {
  
  res.json({
    status: "success",
    code: 200,
    data: {
      data: await contacts.getContactById(req.params['contactId']),
    }
  })
})

router.post('/', async (req, res, next) => {
  console.log(req.body);
  res.json({
    status: "success",
    code: 201,
    data: {
      data: await contacts.addContact(req.body),
    }
  })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
