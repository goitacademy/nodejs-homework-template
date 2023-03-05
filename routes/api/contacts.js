const express = require('express');
const { v4: uuidv4 } = require('uuid')
const {listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')
const router = express.Router()
const {contactValidation} = require('../../validation/contacts')

router.get('/', async (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    data: await listContacts(),
  });
})

router.get('/:contactId', async (req, res, next) => {
  try {
  const { contactId } = req.params;
  const findContactById = await getContactById(contactId)
  if (findContactById) {
    res.json({
      status: 'success',
      code: 200,
      data: findContactById,
    });
  } if (!findContactById) {
    res.json({
      status: 'error',
      code: 404,
      message: "Not found"
    })
  }
  } catch (err) {
    console.log(err)
  }
})


router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body
  const newContact = {
    id: uuidv4(),
    name: name,
    email,
    phone
  }
 res.status(201).json({
    status: 'success',
    code: 201,
    data: newContact,
    
 });
  addContact(newContact)
  
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const delitedContact = await removeContact(contactId)

  if (delitedContact.length > 0) {
    res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact is deleted',
    data: delitedContact
    });
    
  } if (delitedContact.length === 0) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `contact with ${contactId} is not in DataBase`
    })
  }

})

router.put('/:contactId', async (req, res, next) => {
  const { error } = contactValidation(req.body);

  
  if (error) {
    res.json({
      status: 'error',
      code: 400,
      message: error.details[0].message,
    });
  }

  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body)
  console.log(updateContact)
   
  if (updateContact) {
    res.json({
      status: 'success',
      code: 200,
      data: updatedContact,
    });
  } if (!updateContact) {
      res.json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }
})


module.exports = router



