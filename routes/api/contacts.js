const express = require("express");
const {validation, ctrlWrapper} = require("../../middlewares");
const {contacts: ctrl} = require("../../controllers")
const {joiSchema, statusJoiSchema} = require("../../models/contact");


const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById))

router.patch("/:id/status", validation(statusJoiSchema), ctrlWrapper(ctrl.updateStatus));

module.exports = router;