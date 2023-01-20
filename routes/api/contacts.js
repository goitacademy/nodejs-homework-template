const express = require('express');
const contactsApi = require('../../models/contacts.js');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactsApi.listContacts();
  // console.log(contacts);

  res.status(200).json( contacts );
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contactsApi.getContactById(id);
  if (!contact) {
    return res.status(404).json({message: "User not found"});
  }
  res.status(200).json(  contact );
})

router.post('/', async (req, res, next) => {  
  const data = req.body;
  const contact = await contactsApi.addContact(data);
  res.status(201).json( contact );
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const idDeleted = await contactsApi.removeContact(id);
  if (!idDeleted) {
    return res.status(404).json({message: "User not found"});
  }
  res.status(204).json( {message: `User with id${idDeleted} was deleted` });
})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const data = req.body;
  const contact = await contactsApi.updateContact(id, data);
  if (!contact) {
    return res.status(404).json({message: "User not found"});
  }
  res.json( contact )
})

module.exports = router
