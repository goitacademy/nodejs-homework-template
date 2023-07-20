const express = require('express')

const router = express.Router();

const ctrl = require('../../controllers/contacts.js');
const {isValidId} = require('../../middlewares')

router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', ctrl.add)

router.delete('/:contactId', isValidId, ctrl.remove)

router.put('/:contactId', isValidId, ctrl.update)

router.patch('/:contactId/favorite', isValidId, ctrl.updateStatusContact)

module.exports = router
