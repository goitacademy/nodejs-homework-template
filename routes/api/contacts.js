const express = require("express");

const router = express.Router();

const { ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");

const schema = require("../../schemas");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getByID));

router.post("/", validation(schema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(schema), ctrlWrapper(ctrl.update));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
