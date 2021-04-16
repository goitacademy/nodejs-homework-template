const express = require('express')
const router = express.Router()
const actions = require('../../model')
const {validationAddContact, validationUpdateContact} = require('./validationContacts')

router.get('/', async (req, res, next) => {
  const data = await actions.listContacts()
  try {
    return res.status(200).json({
      data,
      message: 'data loaded',
      status: 'success',
      code: '200',
    })
  } catch (err) {
    return res.status(400).json({
      message: 'data is empty',
      status: 'error',
      code: '400',
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await actions.getContactById(req.params.contactId)
    if (data) {
      return res.status(200).json({
      data,
      message: 'data loaded',
      status: 'success',
      code: '200',
    })
    } else {
    return res.status(404).json({
      message: "Not found",
      status: 'error',
      code: '404',
    })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', validationAddContact, async (req, res, next) => {
  try {
    const data = await actions.addContact(req.body)
    return res.status(201).json({
      data,
      message: 'contact created',
      status: 'success',
      code: '201',
    })
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "missing required name field",
      status: 'error',
      code: '400',
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
   try {
    const data = await actions.removeContact(req.params.contactId)
    if (data) {
      return res.status(200).json({
      data,
      message: 'contact deleted',
      status: 'success',
      code: '200',
    })
    } else {
    return res.status(404).json({
      message: "Not found",
      status: 'error',
      code: '404',
    })
    }
  } catch (err) {
    next(err)
  }
})

router.patch('/:contactId',validationUpdateContact, async (req, res, next) => {
  try {
    const data = await actions.updateContact(req.params.contactId, req.body)
    if (data) {
      return res.status(200).json({
      data,
      message: 'contact update',
      status: 'success',
      code: '200',
    })
    } else {
    return res.status(404).json({
      message: "Not found",
      status: 'error',
      code: '404',
    })
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:contactId',validationUpdateContact, async (req, res, next) => {
  try {
    const data = await actions.updateContact(req.params.contactId, req.body)
    if (data) {
      return res.status(200).json({
      data,
      message: 'contact update',
      status: 'success',
      code: '200',
    })
    } else {
    return res.status(404).json({
      message: "Not found",
      status: 'error',
      code: '404',
    })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
