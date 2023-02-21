const express = require('express')
const{validateSingup} = require('../../validator/validator')
const router = express.Router()
const functContacts = require('../../models/contacts.js');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await functContacts.listContacts();
    return res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await functContacts.getContactById(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
        message: 'Contact loaded',
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error}= validateSingup(req.body)
if(error){
  return res.send(error.details)
}
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        data: 'Missing required fields',
      });
    }
    const contact = await functContacts.addContact({ name, email, phone });
    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Contact added',
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await functContacts.removeContactById(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
        message: 'Contact removed',
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error}= validateSingup(req.body)
if(error){
  return res.send(error.details)
}
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        data: 'Missing fields to update',
      });
    }
    const contact = await functContacts.updateContact(
      req.params.contactId,
      req.body,
    );
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Contact updated',
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router





