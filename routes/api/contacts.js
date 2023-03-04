const express = require("express");

const router = express.Router();

const {
  authenticate,
  validation,
  ctrlWrapper,
} = require("../../middlewares");

const { joiSchema, updateSchema } = require("../../models");

const { contacts: ctrl } = require("../../controllers");

router.get(
  "/",
  authenticate,
  ctrlWrapper(ctrl.getAllContacts)
);

router.get(
  "/:id",
  authenticate,
  ctrlWrapper(ctrl.getContactId)
);

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:id",
  authenticate,
  validation(joiSchema),
  ctrlWrapper(ctrl.putContacts)
);

router.patch(
  "/:id",
  authenticate,
  validation(updateSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.delete(
  "/:id",
  authenticate,
  ctrlWrapper(ctrl.deleteContact)
);

module.exports = router;
