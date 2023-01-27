const express = require("express");
const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const contactSchema = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(contactSchema);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.remove));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.update));

module.exports = router;
