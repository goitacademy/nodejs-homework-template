const express = require('express');
const contactsOperations = require('../../model/contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
});

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.patch('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
