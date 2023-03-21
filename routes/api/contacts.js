const express = require("express");

const { validation, ctrlWrapper } = require("../../middelwares");
const { ContactjoiSchema, StatusjoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(ContactjoiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(ContactjoiSchema), ctrlWrapper(ctrl.update));

router.patch(
  "/:id/favorite",
  validation(StatusjoiSchema),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:id", ctrlWrapper(ctrl.remove));

module.exports = router;
