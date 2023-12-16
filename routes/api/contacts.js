const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateStatusSchema,
} = require("../../models/contact");

const router = express.Router();

const ctrl = require("../../controllers/controller");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
