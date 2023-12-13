const express = require('express');

const { listContacts, getContactById, addContact, removeContact, updateContact} = require('../../models/contacts.js');
const router = express.Router()




router.get('/', async (req, res, next) => {
  try {
    const users = await listContacts();
    res.status(200).json({
      message: "Success: You got the list of contacts",
      users
    })
  } catch(error) {
      next(error);
  }
  
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contactById = await getContactById(contactId);

    res.status(200).json({ 
      message: 'Success: You found contact by ID',
      contactById 
    })
  } catch (error) {
    res.status(404).json({
      message: "Not found",
    })
  }
  
})

router.post('/', async (req, res, next) => {
  try {
    
    const newContact = await addContact(req.body);
    res.status(201).json({ 
      message: 'You created new contact',
      newContact })
  } catch (error) {
    res.status(400).json({
      message: "missing required fields",
    })
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params;
    const deletedContact = await removeContact(contactId);

    res.status(200).json({ 
    message: 'contact deleted',
    deletedContact })
  } catch (error) {
    res.status(404).json({
      message: "Not found",
    })
  }
  
})

router.put('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params;
    const updatedContact = await updateContact(contactId, req.body);

    res.status(200).json({ 
    message: 'contact upated',
    updatedContact })
  } catch (error) {
    res.status(404).json({
      message: "Not found",
    })
  }
})

module.exports = router
