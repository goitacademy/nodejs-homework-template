const express = require('express');

const { validation } = require('../../middlewares');
const { contactsSchema } = require('../../schemas');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactsSchema);
const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', validateMiddleware, ctrl.add);

router.put('/:id', validateMiddleware, ctrl.updateById);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
