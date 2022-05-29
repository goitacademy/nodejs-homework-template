const express = require("express");
const schema = require("../../controllers/schema");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsApi: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(schema), ctrl.add);

router.put("/:contactId", validation(schema), ctrlWrapper(ctrl.update));

router.delete("/:contactId", ctrlWrapper(ctrl.remove));

module.exports = router;
