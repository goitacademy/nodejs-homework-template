const ctrl = require('../../controller')
const express = require('express')
const router = express.Router();

router.get('/', ctrl.get)

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.create)

router.delete('/:contactId', ctrl.remove)

router.put('/:contactId', ctrl.update);

router.patch('/:contactId/favorite', ctrl.updateStatus)

module.exports = router
