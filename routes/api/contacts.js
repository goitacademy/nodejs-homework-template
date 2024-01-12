const express = require("express");
const router = express.Router();

const { validateBody, isValidId, aunthenficate } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateStatusSchema,
} = require("../../models/contact");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", aunthenficate, isValidId, ctrl.getContactById);

router.post("/", aunthenficate, validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", aunthenficate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  aunthenficate,
  isValidId,
  validateBody(updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  aunthenficate,
  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
