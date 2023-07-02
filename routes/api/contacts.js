const express = require('express');

const contactsService = require('../../models/contacts');
const contactSchema = require('../../schemas/contacts');

const {HttpError} = require('../../helpers');

const router = express.Router();

// GET /api/contacts
router.get('/', async (req, res, next) => { // control function req->res
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
  
});

// GET /api/contacts/:id
router.get('/:id', async (req, res, next) => { // control function req.params->res (console.log(req.params);)
  try {
    const {id} = req.params;
    const result = await contactsService.getContactById(id);
    if(!result) {
      throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404); using helpers messages
    }
    res.json(result);
  } catch (error) {
    next(error);   // if error is argument next() - f will find error handler
  }
  
  
});

// POST /api/contacts
router.post('/', async (req, res, next) => { // control function req-res
  try {
    // console.log(req.body);
    const {error} = contactSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    };
    // console.log(error);
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/contacts/:id
router.delete('/:id', async (req, res, next) => { // control function req-res
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if(!result) {
      throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404) using helpers messages
    }
    res.json({"message": "Contact deleted"});
  } catch (error) {
    next(error);
  }
});

// PUT /api/contacts/:id
router.put('/:id', async (req, res, next) => { // control function req-res
  try {
    const {error} = contactSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    };

    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if(!result) {
      throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404); using helpers messages
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
