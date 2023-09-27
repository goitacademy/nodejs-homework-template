const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contactsCtrl");
const schema = require("../../schemas/ValidateSchemasContacts");
const ValidateBodyContact = require("../../middlewares/ValidateBodyAddContact");
const paginationSchema = require("../../schemas/ValidatePagination");
const authenticate = require("../../middlewares/authenticate");
// const filterQuerySchema = require("../../schemas/filterQuery");

router.get(
  "/",
  authenticate,
  ValidateBodyContact(paginationSchema),
  ctrl.getAllContacts
);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  ValidateBodyContact(schema.validateAddContactSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  ValidateBodyContact(schema.validateUpdateContactSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  ValidateBodyContact(schema.validateUpdateContactSchema),
  ctrl.updateStatusContact
);

module.exports = router;
