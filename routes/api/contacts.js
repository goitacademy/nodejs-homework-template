const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { schema } = require("../../shcema");
const { contacts: ctrl } = require("../../controllers");

// const validateMiddleware = validation(schema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(schema), ctrlWrapper(ctrl.all));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", validation(schema), ctrlWrapper(ctrl.updateById));

module.exports = router;
