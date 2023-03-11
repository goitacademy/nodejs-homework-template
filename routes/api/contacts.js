const contacts = require('../../models/contacts');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contactsList },
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }

    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body.name);

    if (
      body.name === undefined ||
      body.email === undefined ||
      body.phone === undefined
    ) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required name field',
      });
    }

    const result = await contacts.addContact(req.body);

    res.status(201).json({
      status: 'added',
      code: 201,
      data: { result },
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.removeContact(contactId);

    if (result === undefined) {
      return res.status(404).json({
        status: 'succes',
        code: 404,
        message: 'Not found',
      });
    }
    res.status(200).json({
      status: 'succes',
      code: 200,
      message: 'contact deleted',
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { name, email, phone } = req.body;

    if (name === undefined || email === undefined || phone === undefined) {
      return res.status(400).json({
        status: 'succes',
        code: 400,
        message: 'missing fields',
      });
    }

    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    } else {
      res.json({
        status: 'success',
        code: 200,
        message: 'updated',
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
