const express = require('express');

const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);

router.put('/:contactId', ctrl.updateById);

router.delete('/:contactId', ctrl.removeById);

module.exports = router;
