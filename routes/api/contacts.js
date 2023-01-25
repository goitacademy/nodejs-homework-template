const express = require('express');

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactSchema.newContactSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactSchema.updateContactSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", validation(contactSchema.favoriteContactSchema), ctrlWrapper(ctrl.updateFavorite))

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;

