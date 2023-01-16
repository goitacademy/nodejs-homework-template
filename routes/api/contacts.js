const express = require('express');

const ctrl = require("../../controllers/contacts");



const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get('/:id', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeContact));


module.exports = router;
