const express = require('express');

const ctrl = require('../../controllers/contacts');

const router = express.Router();

router.get('/', ctrl.getList);

// router.get('/:contactId', ctrl.getById);

// router.post('/', ctrl.add);

// router.delete('/:contactId', ctrl.del);

// router.put('/:contactId', ctrl.update);

module.exports = router;
