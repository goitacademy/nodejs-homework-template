const express = require('express');
const router = express.Router();
const {listContacts,getContactById,removeContact,addContact,updateContact} = require('../../model/index');
const {validateAdd,validateUpdate} = require('./validation');

router.get('/', async (req, res, next) => {
  const contacts= await listContacts();
  res.json(contacts)
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contactById= await getContactById(contactId);
  if(contactById) {
    return res.status(200).json(contactById);
  }
  res.status(404).json({message: "Not found"})
})

router.post('/', validateAdd, async (req, res, next) => {
  const body = req.body;
  const contact = await addContact(body);
  res.status(201).json(contact)
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const deleteContact= await removeContact(contactId);
  if(deleteContact) {
    return res.status(200).json({ message: "contact deleted"});
  }
  res.status(404).json({ message: "Not found"});
})

router.patch('/:contactId', validateUpdate,async (req, res, next) => {
  const {contactId}= req.params;
  const updateContactById= await updateContact(contactId,req.body);
  if(updateContactById) {
    return res.status(200).json(updateContactById);
  }
  return res.status(404).json({message: "Not found"});
})

module.exports = router
