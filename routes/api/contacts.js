const express = require('express');

const { contactsSchema } = require('../../validation');
const { authToken } = require('../../middleware');

const { Contact } = require('../../model');
const router = express.Router();

router.get('/', authToken, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contacts = await Contact.find({ owner: _id }, '');
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authToken, async (req, res, next) => {
  const { id } = req.params;
  try {
    const contacts = await Contact.findById(id);
    if (!contacts) {
      return res.status(404).json({ message: 'Not found', code: 404 });
    }
    res.json(contacts);
  } catch (error) {
    if (error.message.includes('Cast to Object failed')) {
      error.status = 404;
    }
    next(error);
  }
});

router.post('/', authToken, async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    const { _id } = req.user;
    const contacts = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({ contacts });
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400;
    }

    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const contacts = await Contact.findByIdAndRemove(id);
    if (!contacts) {
      return res.status(404).json({ message: 'Not found', code: 404 });
    }
    res.json(contacts);
  } catch (error) {
    if (error.message.includes('Cast to Object failed')) {
      error.status = 404;
    }
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { error } = contactsSchema.validate(req.body);
  try {
    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }
    const updateContacts = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateContacts) {
      return res.status(404).json({ message: 'Not found', code: 404 });
    }
    res.json(updateContacts);
  } catch (error) {
    if (error.message.includes('Cast to Object failed')) {
      error.status = 404;
    }

    next(error);
  }
});

router.patch('/:id/favorite', async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { error } = contactsSchema.validate(req.body);
  try {
    if (error) {
      return res.status(400).json({ message: 'missing field favorite' });
    }
    const updateContacts = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
      },
    );
    if (!updateContacts) {
      return res.status(404).json({ message: 'Not found', code: 404 });
    }
    res.json(updateContacts);
  } catch (error) {
    if (error.message.includes('Cast to Object failed')) {
      error.status = 404;
    }

    next(error);
  }
});

module.exports = router;
