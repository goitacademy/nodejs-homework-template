import express from "express";
import contactsController from "../../controllers/contactsController.js"
import dataValidate from "../../validators/contactsValidator.js";
import isValidId from "../../validators/isValidId.js";

const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:contactId', isValidId, contactsController.getById);

router.post('/', dataValidate, contactsController.add);

router.delete('/:contactId', isValidId, contactsController.deleteById);

router.put('/:contactId', isValidId, dataValidate, contactsController.updateById);

router.patch('/:contactId/favorite', isValidId, contactsController.updateStatusContact )

export default router;
