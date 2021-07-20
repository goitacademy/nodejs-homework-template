const express = require('express');

const { validateMiddleware } = require('../../middleware');
const router = express.Router();
const {
  contact: { validateContact },
} = require('../../model/schemas');

const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', express.json(), validateMiddleware(validateContact), ctrl.add);

router.delete('/:contactId', ctrl.del);

router.patch('/:contactId', express.json(), ctrl.update);

router.patch('/:contactId', express.json(), ctrl.updateStatus);

module.exports = router;
