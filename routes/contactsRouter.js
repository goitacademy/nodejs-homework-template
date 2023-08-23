const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    res.json({ message: 'template message' });
  })
  .post(async (req, res, next) => {
    res.json({ message: 'template message' });
  });

router
  .route('/:contactId')
  .get(async (req, res, next) => {
    res.json({ message: 'template message' });
  })
  .delete(async (req, res, next) => {
    res.json({ message: 'template message' });
  })
  .put(async (req, res, next) => {
    res.json({ message: 'template message' });
  });

module.exports = router;
