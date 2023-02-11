const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
