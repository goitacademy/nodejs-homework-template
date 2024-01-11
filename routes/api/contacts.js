const express = require("express");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateStatusSchema,
} = require("../../models/contact");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
