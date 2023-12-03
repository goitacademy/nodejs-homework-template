const express = require('express');

const router = express.Router();
const Joi = require('joi');

const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),

})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  }
  catch (error) {
    next(error);
}
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (contact) {
    res.status(200).json(contact);

    } else {
    res.status(404).json({message: "Not found"});

    }
  } catch(error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({message: "missing required name field"});
  }
})

router.delete('/:contactId', async (req, res, next) => {
    const contactId = req.params.id;
  try {
    await removeContact(contactId);
         res.status(200).json({message: "contact deleted"});
 
  } catch (error) {
            res.status(404).json({message: "Not found"});
 
  }
})

router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.id;
  const { error } = contactSchema.validate(req.body);
    if (error) {
    return res.status(400).json({message: error.details[0].message});
  }
  try {
  const updatedContact = await updateContact(contactId, req.body);
    res.status(200).json(updatedContact);}
 catch (error) {
  res.status(404).json({message: "Not found"});
 
  }

})

module.exports = router