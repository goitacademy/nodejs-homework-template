const express = require('express');
const router = express.Router();

const {contacts: ctrl} = require('../../controllers')


router.get('/', ctrl.get);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:id', ctrl.delContact);

router.put('/:id', ctrl.updatesById);

module.exports = router
