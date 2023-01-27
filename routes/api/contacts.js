const express = require('express');

const { validation, ctrlWrapper, authenticate } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validation(contactSchema.newContactSchema), ctrlWrapper(ctrl.add));

router.put("/:id", authenticate, validation(contactSchema.updateContactSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", authenticate, validation(contactSchema.favoriteContactSchema), ctrlWrapper(ctrl.updateFavorite))

router.delete("/:id", authenticate, ctrlWrapper(ctrl.removeById));

module.exports = router;

