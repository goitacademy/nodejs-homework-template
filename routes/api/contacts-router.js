// const express = require('express');
import express from 'express';

import contactsServise from '../../models/contacts.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await contactsServise.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

router.get('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServise.getContactById(contactId);
    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = 'Server error' } = error;

    res.status(status).json({
      message,
    });
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

export default router;
