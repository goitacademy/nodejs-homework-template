const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");

const { contactSchema } = require("../../schemas");

const middlewareValidation = validation(contactSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", middlewareValidation, ctrlWrapper(ctrl.add));

router.put("/:id", middlewareValidation, ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
