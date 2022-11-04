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
      res.json({ status: 'success', code: 200, data: { contacts } });
    }
    res.json({ status: 'error', code: 404, message: 'Not founds' });
  } catch (err) {
    return err.message;
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (err) {}
});

router.post(
  '/',
  validateSchema(schemaCreateContact),
  async (req, res, next) => {
    try {
      if (req.body.name && req.body.email && req.body.phone) {
        const newContact = await addContact(req.body);
        return res
          .status(201)
          .json({ status: 'success', code: 201, data: { newContact } });
      }
      return res.status(400).json({
        status: 'error',
        code: 400,
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
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact deleted',
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
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
          status: 'error',
          code: 400,
          message: 'Missing required name field',
        });
      }
      const updatedContact = await updateContact(
        req.params.contactId,
        req.body
      );
      if (updatedContact) {
        return res
          .status(201)
          .json({ status: 'success', code: 200, data: { updatedContact } });
      }
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' });
    } catch (err) {
      return err.message;
    }
  }
);

module.exports = router;
