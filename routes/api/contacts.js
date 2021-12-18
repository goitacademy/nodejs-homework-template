const express = require('express');
const router = express.Router();

const { schemaAdd, schemaUpdate } = require('../../model/contacts/joi-schemas');
const contactsOperations = require('../../model/contacts/index');



router.get('/', async (req, res, next) => {
  try {     
    const contacts = await contactsOperations.listContacts();    
    res.json(contacts)   
 } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsOperations.getContactById(contactId);    
    if (!contact) {
      res.status(404).json({ message: 'Not found' })      
    }
    res.json(contact)
    
     } catch (error) {
    next(error);
  }  
})

router.post('/', async (req, res, next) => {
  try {    
    const body = req.body;    
    const result = schemaAdd.validate(body);   
 
    if (result.error) {
      return res.status(400).json({ message: 'missing required name field' }) 
    }
    const contact = await contactsOperations.addContact(body);  
     res.status(201).json(contact)

  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  
  try {
    const contact = await contactsOperations.removeContact(contactId);    
    if (!contact) {
      res.status(404).json({ message: 'Not found' })      
    }
    res.status(200).json({ message: 'contact deleted' })
    
     } catch (error) {
    next(error);
  }  
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;  
  const body = req.body;    
  const result = schemaUpdate.validate(body);
  
  try {
  if (result.error) {
      return res.status(400).json({ message: 'missing  fields' }) 
    }
    const contact = await contactsOperations.updateContact(contactId, body);  
     res.status(200).json(contact)

  } catch (error) {
    next(error);
  }  
  
})

module.exports = router;
