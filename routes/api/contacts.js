const express = require("express");

const router = express.Router();

const controller = require("../../controllers/contacts");

const { validator, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get('/', controller.listContacts);

router.get('/:id', isValidId, controller.getContactById);

router.post('/', validator(schemas.objectStructure), controller.addContact);

router.delete('/:id', isValidId, isValidId, controller.removeContact);

router.put('/:id', isValidId, validator(schemas.objectStructure), controller.updateContact);

router.patch("/:id/favourite", isValidId, validator(schemas.updateFavouriteSchema), controller.updateFavourite);

module.exports = router;
