const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchema, patchSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controller");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.remove));

router.put("/:contactId", validation(contactsSchema), ctrlWrapper(ctrl.update));

router.patch("/:contactId", validation(patchSchema), ctrlWrapper(ctrl.patch));

module.exports = router;
