import express from "express";
import contactsController from "../../controllers/contactsController.js"
import dataValidate from "../../validators/contactsValidator.js";
import isValidId from "../../validators/isValidId.js";
import emptyBodyValidator from "../../validators/contactsValidatorEmptyBody.js";
import emptyBodyFavoriteValidator from "../../validators/contactsValidateEmptyBodyFavorite.js";
import favoriteValidate from "../../validators/contactsFavoriteValidate.js";


const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:contactId', isValidId, contactsController.getById);

router.post('/', emptyBodyValidator, dataValidate, contactsController.add);

router.delete('/:contactId', isValidId, contactsController.deleteById);

router.put('/:contactId', emptyBodyValidator, isValidId, dataValidate, contactsController.updateById);

router.patch('/:contactId/favorite', emptyBodyFavoriteValidator, isValidId, favoriteValidate, contactsController.updateStatusContact )

export default router;
