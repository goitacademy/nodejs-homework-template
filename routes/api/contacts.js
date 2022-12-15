const express = require('express');
const models = require('../../models/contacts');

const Joi = require('joi');
const contactShema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
});
const router = express.Router();
const getError = (status = 400, message = '') => {
  const error = new Error(message);
  error.status = status;
  return error;
};

router.get('/', async (req, res, next) => {
  const contacts = await models.listContacts();
  console.log('get all contacts', contacts);
  res.status(200).json({ message: 'get all contacts', data: { contacts } });
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await models.getContactById(contactId);

    if (!contact) throw getError(404, 'Not found');

    // console.log("get contacts by id", req.params, contactId);
    res.status(200).json({ message: 'get contacts by id', data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactShema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const contact = await models.addContact(body);

    console.log(contact);

    res.status(201).json({ message: 'post item now', data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await models.removeContact(contactId);
    console.log(contact);
    if (!contact) throw getError(404, 'Not found');
    res.json({ message: 'contact deleted', data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactShema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;

    const contact = await models.updateContact(contactId, body);
    console.log(contact);
    res.json({ message: 'put by id', data: { contact } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
