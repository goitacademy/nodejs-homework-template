const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { validation } = require('../../middlewares');
const { contactsSchema } = require('../../shemas');

const validateMiddleware = validation(contactsSchema);

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateMiddleware, ctrl.add);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', validation(contactsSchema), ctrl.updateById);

module.exports = router;
