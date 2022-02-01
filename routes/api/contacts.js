const express = require("express");

const { ctrlWrapper, validation } = require("../../midlewares");
const ctrl = require("../../controllers/contacts");
const { joiSchema, joiStatusSchema } = require("../../models");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(joiStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
