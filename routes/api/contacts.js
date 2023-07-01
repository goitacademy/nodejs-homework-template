const express = require('express');

const contactsService = require('../../models/contacts');

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

router.post('/', async (req, res, next) => { // control function req-res
  res.json({ message: 'template message' });
});

router.delete('/:id', async (req, res, next) => { // control function req-res
  res.json({ message: 'template message' });
});

router.put('/:id', async (req, res, next) => { // control function req-res
  res.json({ message: 'template message' });
});

module.exports = router;
