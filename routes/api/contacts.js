const express = require('express');
const router = express.Router();
const path = require('path');
const SchemaValidator = require(path.resolve('middlewares/SchemaValidator'));
const validateRequest = SchemaValidator();
// generic route handler
const genericHandler = (req, res, next) => {
  res.json({
    status: 'success',
    data: req.body,
  });
};
router.get('/', async (req, res, next) => {
  res.json({ contacts: [], message: 'template message' });
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'go go go' });
});

router.post('/', (validateRequest, genericHandler));

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: req.route.path });
});

router.put('/:contactId', (validateRequest, genericHandler));
module.exports = router;
