const express = require("express");

const { contactValidation } = require("../../middlewares");

const { postContactSchema, putContactSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", contactValidation(postContactSchema), ctrl.addContact);

router.put(
  "/:contactId",
  contactValidation(putContactSchema),
  ctrl.updateContactById
);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
