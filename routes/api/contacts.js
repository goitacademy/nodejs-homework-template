import express from "express";
import contactsController from "../../controllers/contactsController.js"
import dataValidate from "../../validators/contactsValidator.js";

const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:contactId', contactsController.getById);

router.post('/', dataValidate, contactsController.add);

router.delete('/:contactId', contactsController.deleteById);

router.put('/:contactId', dataValidate, contactsController.updateById);

export default router;
