const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrl.fetchAll);
router.get('/:contactId', ctrl.fetchById);
router.post('/', ctrl.add);
router.put('/:contactId', ctrl.update);
router.delete('/:contactId', ctrl.remove);

module.exports = router;
