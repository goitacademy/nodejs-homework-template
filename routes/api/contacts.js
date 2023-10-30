const express = require('express');
const contacts = require('../../models/contacts');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await contacts.listContacts());
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if(!contact){
      const error = (new Error('Contact not found'));
      error.status = 404;
      throw error;
    }
    res.json();
  } catch (error) {
    const {status = 500, message = 'Server Error'} = error;
    res.status(status).json({ message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(201).json(await contacts.addContact(req.body));
  } catch (error) {
    const {status = 500, message = 'Server Error'} = error;
    res.status(status).json({ message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    console.log(result);
    if(!result){
      const error = (new Error('Contact not found'));
      error.status = 404;
      throw error;
    }
    res.status(200).json({"message": "contact deleted"});
  } catch (error) {
    const {status = 500, message = 'Server Error'} = error;
    res.status(status).json({ message });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if(!result){
      const error = (new Error('Contact not found'));
      error.status = 404;
      throw error;
    }
    res.status(200).json(result);
  } catch (error) {
    const {status = 500, message = 'Server Error'} = error;
    res.status(status).json({ message });
  }
});

module.exports = router;
