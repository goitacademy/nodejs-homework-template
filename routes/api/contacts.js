const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();


router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.add);

router.put('/:id', ctrl.update);

router.delete('/:id', ctrl.del);

module.exports = router