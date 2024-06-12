const express = require('express');
const router = express.Router();
const Contact = require('../../models/contacts.js');

router.get('/', async (req, res, next) => {
  const allContacts = await Contact.getAll();
  res.json({
    status: 'success',
    code: 200,
    data: { allContacts },
  });
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    res.json({
      status: 'rejected',
      code: 404,
      message: 'Not Found',
    });
  } else {
    res.json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await Contact.create({ name, email, phone });
    if (!name || !email || !phone) {
      res.json({
        status: 'failed',
        code: 400,
        message: 'missing required name - field',
      });
    } else {
      res.json({
        status: 'success',
        code: 201,
        message: 'Added new contact',
        data: { newContact },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(contactId);
  if (!deleteContact) {
    res.json({
      status: 'rejected',
      code: 404,
      message: 'Not Found',
    });
  } else {
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
    });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const updateCurrentContact = await Contact.findByIdAndUpdate(contactId, body);
  if (Object.keys(req.body).length === 0) {
    res.json({
      status: 'rejected',
      code: 400,
      message: 'missing fields',
    });
  }

  if (!updateCurrentContact) {
    res.json({
      status: 'failed',
      code: 404,
      message: 'Not Found',
    });
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Contact successfully changed!',
  });
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite || favorite === undefined) {
    res.json({
      status: 'failed',
      code: 400,
      message: 'Missing field favorite',
    });
  }
  try {
    const updateStatusContact = async () => {
      const updatedContact = await Contact.findByIdAndUpdate(contactId, {
        favorite: true,
      });
      if (!updatedContact) {
        res.json({
          status: 'failed',
          code: 404,
          message: 'Not found',
        });
      }
      res.json({
        status: 'success',
        code: 200,
        message: 'Contact successfully updated',
      });
    };
    updateStatusContact();
  } catch (error) {}
});
module.exports = router;
