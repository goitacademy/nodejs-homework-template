const express = require("express");

const router = express.Router();
const { ctrlWrapper } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id");

router.post("/", ctrlWrapper(ctrl.add));

router.delete("/:id");

router.put("/:id");

module.exports = router;
