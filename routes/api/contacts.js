const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper, validation } = require("../../middlewares");
const { schema } = require("../../schema");

const validateMiddleware = validation(schema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getId));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteId));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router;
