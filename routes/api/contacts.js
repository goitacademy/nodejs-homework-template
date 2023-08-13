const express = require('express');
const { listContacts, getContactById, addContact, removeContact, updateContact  } = require('../../models/contacts');
// const { HttpError } = require('../../helpers');
const { contactValidator } = require('../../shemas/validatorContacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact)      
    } else {
      res.status(404).json( {message: 'Not found'} )
      // throw HttpError(404, 'Not found')
    };
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error) {
      const errorType = error.details[0];
      if (errorType.type === 'any.required') {
        return res.status(400).json( {message: `missing required ${errorType.path[0]} field`} )
      }
      return res.status(400).json({ message: `${errorType.message}` })
    };

    const contact = await addContact(req.body);
    res.status(201).json(contact)
  } catch (error) {
    console.log(error);
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
	  const contact = await removeContact(contactId);
    if (!contact) {
      return res.status(404).json({message: 'Not found'})
    };    
    res.status(200).json({message: 'contact deleted'})
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      res.status(400).json( {message: `missing fields`} )
    };

    const { error } = contactValidator(req.body);
    if (error) {
      const errorType = error.details[0];
      if (errorType.type === 'any.required') {
        return res.status(400).json( {message: `missing required ${errorType.path[0]} field`} )
      }
      return res.status(400).json({ message: `${errorType.message}` })
    };

    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      return res.status(404).json( {message: `Not found`} )
    };    
    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
})

module.exports = router
