const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");
const { authenticate } = require("../../middlewares");
const router = express.Router();
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateContactbyID
);

router.delete("/:contactId", authenticate, ctrl.deleteContactById);

module.exports = router;
