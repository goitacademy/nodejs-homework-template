const express = require('express');
const { listContacts, getContactById, addContact, removeContact, updateContact  } = require('../../models/contacts');
const { HttpError } = require('../../helpers');
const { contactValidator } = require('../../shemas/validatorContacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    // console.log('GET /', contacts);
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw HttpError(404, 'Not found')
    };
    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error) {
      throw HttpError(400, `${error.details[0].message}`)
    };
    const contact = await addContact(req.body);
    if (!contact) {
      throw HttpError(400, 'missing required name field')
    };    
    res.status(201).json(contact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
	  const contact = await removeContact(contactId);
    if (!contact) {
      throw HttpError(404, 'Not found')
    };    
    res.status(200).json({message: 'contact deleted'})
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error) {
      throw HttpError(400, `${error.details[0].message}`)
    };

    // const { name, email, phone } = req.body;
    // if (!name && !email && !phone) {
    //   throw HttpError(400, 'missing fields')
    // };

    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      throw HttpError(404, 'Not found')
    };    
    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
})

module.exports = router
