const express = require("express");

const { contactSchema } = require("../../schemas");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(contactSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
