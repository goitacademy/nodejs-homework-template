const express = require('express');

const contacts = require('../../models/contacts');

const { HttpError } = require('../../helpers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({
      status: 200,
      message: 'Success',
      result,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
      // return res.status(404).json({
      //   status: 404,
      //   message: 'Not found',
      // });
    }
    res.json({
      status: 200,
      message: `contact id: ${contactId}`,
      result,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   status: 500,
    //   message: 'Server error',
    // });

  }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
