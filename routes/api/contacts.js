const express = require('express')

const router = express.Router();

const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const validateMiddleware = validation(schemas.reqBodySchema);
const validateUpdateFavMiddleware = validation(schemas.updateFavoriteSchema);
const { contacts: ctrl } = require("../../controllers");

router.get('/', ctrlWrapper(ctrl.listContacts));
router.get('/:id', isValidId, ctrlWrapper(ctrl.getContactById));
router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact));
router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeContact));
router.put('/:id', isValidId, validateMiddleware, ctrlWrapper(ctrl.updateContact));
router.patch('/:id/favorite', isValidId, validateUpdateFavMiddleware, ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
