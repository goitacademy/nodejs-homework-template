const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middelwares");
const { ContactjoiSchema, StatusjoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(ContactjoiSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  auth,
  validation(ContactjoiSchema),
  ctrlWrapper(ctrl.update)
);

router.patch(
  "/:id/favorite",
  auth,
  validation(StatusjoiSchema),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:id", auth, ctrlWrapper(ctrl.remove));

module.exports = router;
