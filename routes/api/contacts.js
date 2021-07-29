/* eslint-disable semi */
const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../model/index');
// const { validationContact } = require('./valid-contacts-router');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(Number(contactId));
    if (contact) {
      return res.json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  console.log(req);
  try {
    const contact = await addContact(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 201,
        message: 'Contact deleted',
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.patch('/:contactId', async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
