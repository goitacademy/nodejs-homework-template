const express = require('express');
const {isValidId} = require("../../middlewares")

const ctrl = require("../../controllers/contacts")

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:contactId', isValidId, ctrl.remove);

router.put('/:contactId', isValidId, ctrl.update);

router.patch("/:contactId/favorite", ctrl.updateFavoriteContact);

module.exports = router
