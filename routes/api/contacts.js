const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authen } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", authen, ctrl.getAllContacts);

router.get("/:contactId", authen, isValidId, ctrl.getContactById);

router.post("/", authen, validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  authen,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authen,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authen, isValidId, ctrl.deleteContactById);

module.exports = router;
