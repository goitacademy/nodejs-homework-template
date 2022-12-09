const express = require('express')

const router = express.Router()
const { NotFound, BadRequest } = require('http-errors');
const Joi = require('joi');

// const {
//   listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
// } = require('../../models');

const contactsAction = require('../../models/index');

const joiShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsAction.listContacts();
    if (!contacts) { 
      throw new NotFound();
    }
    res.json(contacts);
  } catch (err) { 
    next(err);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsAction.getContactById(contactId);
    if (!contact) {
      throw new NotFound();
    }
    res.json(contact)
  } catch (err) { 
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body);
    if (error) { 
      throw new BadRequest(400, "missing required name field");
    }
    const newContact = await contactsAction.addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) { 
    next(err);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsAction.removeContact(contactId);
    if (!deleteContact) {
      throw new NotFound();
    }
    res.json("message: contact deleted");
  } catch (err) {
    next(err);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body);
    if (!error) { 
      throw new BadRequest("message: missing fields");
    }
    const { contactId } = req.params;
    const updateContact = await contactsAction.updateContact(contactId, req.body);
    res.json(updateContact);
  } catch (err) { 
    next(err);
  }
})

module.exports = router;
