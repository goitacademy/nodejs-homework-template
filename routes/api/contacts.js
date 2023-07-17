import express from "express";
import contactsController from "../../controllers/contactsController.js"

const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:contactId', contactsController.getById);

router.post('/', contactsController.add);

router.delete('/:contactId', contactsController.deleteById);

router.put('/:contactId', contactsController.updateById);

export default router;
