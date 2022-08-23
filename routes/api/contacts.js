const express = require('express');

const ctrl = require('../../controllers/index');

const validId = require('../../middlewares/isValidId');

const router = express.Router();

const { schemas } = require("../../models/conatcts");

router.get('/', ctrl.listContacts);

router.get('/:contactId', validId, ctrl.getContactById);

router.post('/', schemas.addSchema, ctrl.addContact);

router.delete('/:contactId', validId, ctrl.removeContact);

router.put('/:contactId', schemas.addSchema, validId,  ctrl.updateContact);

router.patch('/:contactId/favorite', schemas.updateFavoriteSchema, ctrl.updateFavorite);

module.exports = router;
