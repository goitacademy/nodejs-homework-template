const express = require("express");

const { validation, ctrlWrapper } = require("../../middelwares");
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.update));

router.delete("/:id", ctrlWrapper(ctrl.remove));

module.exports = router;
