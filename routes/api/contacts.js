const express = require("express");

const { validateBody, isValidId, aunthenficate } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateStatusSchema,
} = require("../../models/contact");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", aunthenficate, ctrl.listContacts);

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
  aunthenficate,
  isValidId,
  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
