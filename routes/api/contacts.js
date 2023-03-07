const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const schema = require("../../schema/schema");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(schema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put("/:contactId", validation(schema), ctrlWrapper(ctrl.updateContact));

module.exports = router;
