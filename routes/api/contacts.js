const express = require('express');
const router = express.Router();
const contactsOps = require('../../model');
const { schemaAddContact, schemaUpdateContact } = require('./validation');

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contactsOps.listContacts();
    return res.json({ status: 'success', code: 200, data: allContacts });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const contactById = await contactsOps.getContactById(id);
    if (contactById) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: contactById });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schemaAddContact.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    const contact = await contactsOps.addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: contact });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const deletedById = await contactsOps.removeContact(id);
    if (deleteById) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: deletedById,
        message: 'contact deleted',
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schemaUpdateContact.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing field' });
    }
    const { contactId: id } = req.params;
    const updatedById = await contactsOps.updateContact(id, req.body);
    if (updatedById) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: updatedById });
    }
    return res
      .status(400)
      .json({ status: 'error', code: 404, message: 'missing fields' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
