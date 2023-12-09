const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const addSchema = require("../../schemas/contacts");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(addSchema.addShema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(addSchema.addShemaPut),
  ctrl.updateContact
);

router.patch("/:contactId", authenticate, ctrl.updateStatusContact);

module.exports = router;
