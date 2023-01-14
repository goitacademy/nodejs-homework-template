const express = require("express");
const { validation, authenticate } = require("../../middlewares");
const {ctrlWrapper} = require("../../helpers")
const { contactSchema, updateFavoriteSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");
const validateMiddleware = validation(contactSchema);
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validateMiddleware, ctrlWrapper(ctrl.addContact));

router.put("/:contactId", authenticate, validateMiddleware, ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', authenticate, validation(updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact))

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.removeContact));

module.exports = router;
