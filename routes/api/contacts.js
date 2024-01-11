const express = require("express");
const { validateBody, isValidId, aunthenticate } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateStatusSchema,
} = require("../../models/contact");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", aunthenticate, ctrl.listContacts);

router.get("/:contactId", aunthenticate, isValidId, ctrl.getContactById);

router.post("/", aunthenticate, validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", aunthenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  aunthenticate,
  isValidId,
  validateBody(updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  aunthenticate,
  isValidId,
  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
