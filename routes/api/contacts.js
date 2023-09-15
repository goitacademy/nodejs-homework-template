const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts.json')

// GET /api/contacts

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);

    //
    // res.status(200).json(contacts);
    // res.send('Hello world!'); 
  } catch (error) {
    next(error);
  }
})

// GET /api/contacts/:id

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params; // ??? req.params.id??
    const contact = await getContactById(contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
})

// POST /api/contacts

router.post('/', async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
})

// DELETE /api/contacts/:id

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params; // ??? req.paramsid??
    const removedContact = await removeContact(contactId);
    res.json({ message: 'Contact deleted', contact: removedContact });
  } catch (error) {
    next(error);
  }
})

// PUT /api/contacts/:id

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    console.log(req.params)

    const updatedContact = await updateContact(contactId, req.body);
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
})

module.exports = router;

