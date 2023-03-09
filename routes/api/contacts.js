const express = require("express");

const { validation, ctrlWrapper } = require("../../middelwares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactSchema), ctrlWrapper(ctrl.update));

router.delete("/:id", ctrlWrapper(ctrl.remove));

module.exports = router;
