const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactScheme } = require("../../schemes");

const validationMiddleware = validation(contactScheme);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validationMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", validationMiddleware, ctrlWrapper(ctrl.updateById));

module.exports = router;
