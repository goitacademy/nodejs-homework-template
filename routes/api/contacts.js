const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, updateFavoriteSchema } = require("../../model/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", ctrlWrapper(ctrl.updateById));

router.patch("/:contactId/favorite", validation(updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))

module.exports = router;
