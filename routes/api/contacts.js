const express = require("express");
const ctrl = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schema");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put("/:contactId", validateBody(schemas), ctrlWrapper(ctrl.updateById));

module.exports = router;
