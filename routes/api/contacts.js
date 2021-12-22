const express = require('express');
const router = express.Router();
const { contactsSchema } = require('../../validation');

const contact = require('../../model');

// router.get('/', async (req, res, next) => {
//   try {
//     const contacts = await contactsOperations.listContacts();
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const contacts = await contactsOperations.getContactById(contactId);
//     if (!contacts) {
//       return res.status(404).json({ message: 'Not found', code: 404 });
//     }
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//   }
// });

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const contacts = await contact.create(req.body);
    res.status(201).json({ contacts });
  } catch (error) {
    next(error);
  }
});

// router.delete('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const contacts = await contactsOperations.removeContact(contactId);
//     if (!contacts) {
//       return res.status(404).json({ message: 'Not found', code: 404 });
//     }
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const { error } = contactsSchema.validate(req.body);
//   try {
//     if (error) {
//       return res.status(400).json({ message: 'missing fields' });
//     }
//     const updateContacts = await contactsOperations.updateContactById(
//       contactId,
//       req.body,
//     );
//     if (!updateContacts) {
//       return res.status(404).json({ message: 'Not found', code: 404 });
//     }
//     res.json(updateContacts);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
