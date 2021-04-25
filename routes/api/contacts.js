const express = require('express');
const router = express.Router();
const { listContacts, addContact, getContactById, updateContact, removeContact } = require('../../model/index.js');
const { validAddContact, validUpdateContact, validObjectId, validUpdateStatusContact } = require('./validation');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({
      status: 'success',
      code: '200',
      data: { contacts }
    })
  } catch (err) {
    next(err)
  }
});

router.get('/:contactId', validObjectId, async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: '200',
        data: { contact }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: '404',
        data: 'Not Found',
      })
    }
  }
  catch (err) {
    next(err)
  }
});

router.post('/', validAddContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res.status(201).json({
      status: 'success',
      code: '201',
      data: { contact }
    })
  } catch (err) {
    next(err)
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: '200',
        message: 'contact deleted',
        data: { contact }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: '404',
        data: 'Not Found',
      })
    }
  }
  catch (err) {
    next(err)
  }
});

router.put('/:contactId', validUpdateContact, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: 'success',
        code: '200',
        data: { contact }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: '404',
        data: 'Not Found',
      })
    }
  }
  catch (err) {
    next(err)
  }
});

router.patch('/:contactId/favorite', validUpdateStatusContact, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
});

module.exports = router;
