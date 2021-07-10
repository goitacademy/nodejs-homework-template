const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../model');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await ctrl.listContacts();

    return res.json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await ctrl.getContactById(req.params.contactId);

    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }

    return res.json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const contact = await ctrl.addContact(req.body);

    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await ctrl.removeContact(req.params.contactId);

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
        message: 'Contact deleted',
      });
    }

    return res.json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId', async (req, res, next) => {
  try {
    const contact = await ctrl.updateContact(req.params.contactId, req.body);

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    }

    return res.json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
