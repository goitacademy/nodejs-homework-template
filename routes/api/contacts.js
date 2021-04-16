const express = require('express');
const router = express.Router();
const Contacts = require('../../model/index');
const validate = require('./validation');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
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
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post('/', validate.createContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
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
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.put('/:contactId', validate.UpdateContact, async (req, res, next) => {
  if (Object.entries(req.body).length === 0) {
    return res.status(400).json({
      message: 'missing fields',
    });
  }
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
