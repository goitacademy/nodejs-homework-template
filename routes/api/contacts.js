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
  if (await contacts.getContactById(req.params['contactId']) === undefined ){
    res.json({
      status: "error",
      code: 404,
      data: {
        data: 'Error 404! Not found',
      }
    })
  }
  else {
    res.json({
      status: "success",
      code: 200,
      data: {
        data: await contacts.getContactById(req.params['contactId']),
      }
    })
  }
})

router.post('/', async (req, res, next) => {
  if (await contacts.addContact(req.body) === 'error') {
    res.json({
      status: "error",
      code: 400,
      data: {
        data: "missing required name field",
      }
    })
  } else {
    res.json({
      status: "success",
      code: 200,
      data: {
        data: await contacts.addContact(req.body),
      }
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  if (await contacts.getContactById(req.params['contactId']) === undefined ){
    res.json({
      status: "error",
      code: 404,
      data: {
        data: 'Error 404! Not found',
      }
    })
  } else {
      res.json({
      message: "contact deleted",
      status: "success",
      code: 200,
      data: {
        data: await contacts.removeContact(req.params['contactId'])
      }
    })
  }
})

router.patch('/:contactId', async (req, res, next) => {
  console.log(req.params['contactId']);
  if (await contacts.updateContact(req.params['contactId']) === undefined ){
    res.json({
      status: "error",
      code: 404,
      data: {
        data: 'Error 404! ID not found',
      }
    })
  }
  else {
    res.json({
      message: "contact update",
      status: "success",
      code: 200,
      data: {
        data: await contacts.updateContact(req.params['contactId'], req.body)
      }
    })
  }
})

module.exports = router
  // else if (await contacts.updateContact(req.params['contactId'], req.body) === 'error') {
  //   res.json({
  //     status: "error",
  //     code: 500,
  //     data: {
  //       data: 'missing required name field',
  //     }
  //   })
  // }