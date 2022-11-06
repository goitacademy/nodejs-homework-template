const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');
const { validateSchema } = require('../../middlewares/SchemaValidator');
const {
  schemaCreateContact,
  schemaUpdateContact,
} = require('./validationSchemas');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (contacts) {
      return res.status(200).json(contacts);
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return err.message;
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      return res.status(200).json(contact);
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {return err.message}
});

router.post(
  '/',
  validateSchema(schemaCreateContact),
  async (req, res, next) => {
    try {
      if (req.body.name && req.body.email && req.body.phone) {
        const newContact = await addContact(req.body);
        return res.status(201).json(newContact);
      }
      return res.status(400).json({
        message: 'Missing required name field',
      });
    } catch (err) {
      return err.message;
    }
  }
);

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req.params.contactId);
    if (deletedContact) {
      return res.status(200).json({
        message: 'Contact deleted',
      });
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return err.message;
  }
});

router.put(
  '/:contactId',
  validateSchema(schemaUpdateContact),
  async (req, res, next) => {
    try {
      if (!req.body.name && !req.body.email && !req.body.phone) {
        return res.status(400).json({
          message: 'Missing required name field',
        });
      }
      const updatedContact = await updateContact(
        req.params.contactId,
        req.body
      );
      if (updatedContact) {
        return res.status(201).json(updatedContact);
      }
      return res.status(404).json({ message: 'Not found' });
    } catch (err) {
      return err.message;
    }
  }
);

module.exports = router;
