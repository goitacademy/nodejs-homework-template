const express = require('express');
const contacts = require('../../models/contacts');
const router = express.Router();
const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const { HttpError } = require('../../helpers');
//          GET

router.get('/', async (req, res, next) => {
  try {
    const contactList = await contacts.listContacts();

    res.json(contactList);
  } catch (error) {
    next(error);
  }
});

//          GET ID

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactById = await contacts.getContactById(contactId);

    //  Not found
    if (contactById === null) {
      throw HttpError(404, 'Not Found');
    }

    res.json(contactById).status(200);
  } catch (error) {
    next(error);
  }
});

//         POST
router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// DELETE

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const removeContactById = await contacts.removeContact(contactId);
    //  Not found
    if (removeContactById === null) {
      throw HttpError(404, 'Not Found');
    }

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

//             PUT

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const updateContactById = await contacts.updateContact(contactId, req.body);
    if (!updateContactById) {
      throw HttpError(404, 'Not Found');
    }
    res.json(updateContactById);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
