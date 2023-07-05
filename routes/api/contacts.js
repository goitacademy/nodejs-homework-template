const express = require('express');
const Joi = require('joi');
const router = express.Router();
const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
      res.json(result);
  } catch (error) {
      next(error);
  };
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  };
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    };
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  };
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    };
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    };
    res.json(result);
  } catch (error) {
    next(error);
  };
})

// router.delete('/:id', async (req, res, next) => {
//   const contactId = req.params.id;
//   const result = await contacts.removeContact(contactId);

//   if (result) {
//     res.json({ message: 'contact deleted' });
//   } else {
//     res.status(404).json({ message: 'Not found' });
//   }
// })



module.exports = router
