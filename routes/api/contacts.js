const express = require("express");

const {validation, ctrlWrapper} = require("../../middlewares");
const {contactsSchema} = require("../../schemas");
const {contacts: ctrl} = require("../../controllers")

const validateMiddleware = validation(contactsSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactsSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById))

module.exports = router;