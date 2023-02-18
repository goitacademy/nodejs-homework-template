const express = require("express");

const {
  validation,
  ctrlWrapper,
} = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

const validateMiddlevare = validation(contactSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactId));

router.post(
  "/",
  validateMiddlevare,
  ctrlWrapper(ctrl.postContact)
);

router.put(
  "/:id",
  validateMiddlevare,
  ctrlWrapper(ctrl.putContacts)
);

router.delete("/:id", ctrlWrapper(ctrl.deleteContact));

module.exports = router;
