const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controller');

const isValidId = require("../../middlewares/isValidId");

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:contactId', isValidId, ctrl.remove);

router.put('/:contactId', isValidId, ctrl.update);

router.patch('/:contactId/favorite', isValidId, ctrl.updateFavorite);

module.exports = router;
