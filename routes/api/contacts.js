const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema, updateFavoriteSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");
const validateMiddleware = validation(contactSchema);
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', validation(updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact))

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
