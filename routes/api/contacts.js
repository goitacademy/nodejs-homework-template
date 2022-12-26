const express = require("express");

const { contacts: ctrl } = require("../../contlollers");
const { ctrlWrapper, validation } = require("../../middlewares");
const { contactSchema } = require("../../schema");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;

// LCUd4D4TtwirIViG
