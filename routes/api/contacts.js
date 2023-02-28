const express = require("express");

const router = express.Router();

const {
  validation,
  ctrlWrapper,
} = require("../../middlewares");

const { joiSchema, updateSchema } = require("../../models");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactId));

router.post(
  "/",
  validation(joiSchema),
  ctrlWrapper(ctrl.postContact)
);

router.put(
  "/:id",
  validation(joiSchema),
  ctrlWrapper(ctrl.putContacts)
);

router.patch(
  "/:id",
  validation(updateSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.delete("/:id", ctrlWrapper(ctrl.deleteContact));

module.exports = router;
