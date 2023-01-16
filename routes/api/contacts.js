const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
