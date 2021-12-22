const express = require('express');
const router = express.Router();
const { contactsSchema } = require('../../validation');

const contact = require('../../model');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const contacts = await contact.findById(id);
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

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const contacts = await contact.create(req.body);
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
    const contacts = await contact.findByIdAndRemove(id);
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
    const updateContacts = await contact.findByIdAndUpdate(id, req.body, {
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
      return res.status(400).json({ message: 'missing fields' });
    }
    const updateContacts = await contact.findByIdAndUpdate(
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
