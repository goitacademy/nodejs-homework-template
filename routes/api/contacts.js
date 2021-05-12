const express = require('express')
const router = express.Router()
const contacts = require('../../model/index.js');
const file = require('../../model/contacts.json');
const Joi = require('joi');
const { isError } = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string().email({
    minDomainSegments: 2, tlds: {
      allow: ['com', 'net']
    }
  }).required(),
  phone: Joi.string().required(),
})

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
  try {
    await schema.validateAsync(req.body);
    res.json({
      status: "success",
      code: 201,
      data: await contacts.addContact(req.body),
    })
  }catch (error) {
    res.json({
      status: "fail",
      code: 400,
      error: error.message,
    })
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    if (await contacts.getContactById(req.params['contactId']) === undefined ){
      res.json({
        status: "error",
        code: 404,
        message: 'Not found',
      })
    }
    res.json({
      message: "contact deleted",
      status: "success",
      code: 200,
      data: await contacts.removeContact(req.params['contactId']),
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    if (await contacts.getContactById(req.params['contactId']) === undefined) {
      res.json({
        status: "error",
        code: 404,
        message: "ID Not Found",
      })
    }
    await schema.validateAsync(req.body);
    console.log(req.params['contactId'], req.body);
    res.json({
      message: "contact updated",
      status: "success",
      code: 200,
      data: await contacts.updateContact(req.params['contactId'], req.body),
    })
  } catch (error) {
    res.json({
      status: "fail",
      code: 400,
      error: error.message,
    })
    next(error);
  }
})

module.exports = router
