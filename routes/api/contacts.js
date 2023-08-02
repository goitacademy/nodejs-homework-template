const express = require('express')
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts.js');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);

  } catch (error) {
    res.status(404);
    next(error)
  }; 
})


router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId
    const singleContact = await getContactById(contactId);
    if (!singleContact) {
      res.status(404).json({ message: "Not found" })
    }
    res.json(singleContact);
    res.status(200);
  } catch (error) {
    next(error);
  };
    
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const newContact = await addContact(body);
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
    res.status(404).json({ message: "Could not validate input" })
  };
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const deleteContact = await removeContact(contactId);
    if (!deleteContact) {
      res.status(404).json({ message: "Not found" })
    }
    res.status(200).json({ message: "contact deleted" });
    
  } catch (error) {
    next(error);
    res.status(404).json({ message: "Could delete contact" })
    
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;
    
    if (body === null) {
      res.status(404).json({ message: "Could not validate input" })
    }
    const updatedContact = await updateContact(contactId, body);
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" })
    }
    res.status(200).json({ message: "contact updated" });
  } catch (error) {
    next(error);
    res.status(404).json({message: "could not update contact"})
  }
 
})

module.exports = router
