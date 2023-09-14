// const express = require('express');
import express from 'express';
// ---------------------------------------------------------
import contactsService from '../../models/contacts.js';
// const contacts = require('../../models/contacts.json');
// import contacts from '../../models/contacts.json';
import contacts from '../../models/contactsData.js';

const contactsRouter = express.Router();

contactsRouter.get('/', (req, res) => {
  res.json(contacts);
});

contactsRouter.get('/:id', (req, res) => {
  res.json(contacts[0]);
});

contactsRouter.post('/', (req, res) => {
  res.json(contacts[0]);
});

contactsRouter.delete('/:id', (req, res) => {
  res.json(contacts[0]);
});

contactsRouter.put('/:id', (req, res) => {
  res.json(contacts[0]);
});

// module.exports = contactsRouter;
export default contactsRouter;
// ---------------------------------------------------------

// const router = express.Router();

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// module.exports = router;
