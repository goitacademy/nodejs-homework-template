const express = require("express");

const { contacts: ctrl } = require("../../contlollers");
const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { contactSchema, contactStatusSchema } = require("../../schema");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(contactSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/status",
  validation(contactStatusSchema),
  ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;
