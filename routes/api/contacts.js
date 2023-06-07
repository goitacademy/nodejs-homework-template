const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await listContacts();
    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
});

router.get('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json(result)
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.delete('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.put('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId);
    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

module.exports = router;
