const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts');
const { addContactValidation, updateContactValidation } = require('../../middlewares/validationMiddleware');

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json({ data: contacts});
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    // console.log(req);
    const foundContact = await getContactById(String(req.params.contactId));
    if (foundContact) {
      return res.status(200).json({ data: foundContact }); 
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
})

router.post('/', addContactValidation, async (req, res, next) => {
  try {
    // console.log(req.body);
    // addContact(req.body);
    const newContact = await addContact(req.body);
    return res.status(201).json({ data: newContact });

  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deletedContact = await removeContact(String(req.params.contactId));
    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted" }); 
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', updateContactValidation, async (req, res, next) => {
  try {
    const updatedContact = await updateContact(String(req.params.contactId), req.body);
    // console.log(updatedContact);
    if (updatedContact) {
      return res.status(200).json({ data: updatedContact }); 
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
})

module.exports = router
