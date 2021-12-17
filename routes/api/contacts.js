const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const joiSchema = require("../../schemas/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.put("/:id", ctrlWrapper(ctrl.updateById));

module.exports = router;
