const express = require('express');

const contacts = require('../../models/contacts');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const result = await contacts.listContacts();

    return res.json({
      status: 'Success',
      code: 200,
      message: 'Contacts found',
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (result) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'Contact found',
        data: {
          result,
        },
      });
    } else {
      return res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = contacts.addContact(req.body);

    if (!result) {
      return res.json({
        status: 'Success',
        code: 201,
        message: 'Request successful. Contact created',
        data: {
          result,
        },
      });
    } else {
      return res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'Missing required name field',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
});

module.exports = router;
