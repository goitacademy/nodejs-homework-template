const express = require("express");
const {auth, validation, ctrlWrapper} = require("../../middlewares");
const {contacts: ctrl} = require("../../controllers")
const {joiSchema} = require("../../models/contact");


const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id",auth, ctrlWrapper(ctrl.removeById))

// router.patch("/:id/status", validation(statusJoiSchema), ctrlWrapper(ctrl.updateStatus));

module.exports = router;