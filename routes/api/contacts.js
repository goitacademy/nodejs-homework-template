const express = require("express");
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { schemas } = require("../../models");
const { contacts: ctrl } = require("../../controller");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.contactsSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.remove));

router.put("/:contactId", isValidId, validation(schemas.contactsSchema), ctrlWrapper(ctrl.update));

router.patch(
    "/:contactId/favorite",
    isValidId,
    validation(schemas.favoriteSchema),
    ctrlWrapper(ctrl.patch)
);

module.exports = router;
