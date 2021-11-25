const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', ctrl.updateById);

module.exports = router;
