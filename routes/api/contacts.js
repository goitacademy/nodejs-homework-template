const express = require('express');
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../models/contacts');

const {HttpError} = require('../../helpers')

const router = express.Router();

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});


router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result)
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addScheme.validate(req.body);
    if (error) {
      console.log(error);
      throw HttpError(400, `missing field ${error.message}`);
    }

    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json({
      message: "Contact deleted",
      result
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addScheme.validate(req.body);
    if (error) throw HttpError(400, `missing field ${error.message}`);
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
