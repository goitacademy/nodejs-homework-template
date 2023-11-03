const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../midlewares/validateBody");
const checkRequestBody = require("../../midlewares/checkRequestBody");

const schema = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post(
  "/",
  checkRequestBody,
  validateBody(schema.contactSchema),
  ctrl.addContact
);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  checkRequestBody,
  validateBody(schema.contactSchema),
  ctrl.updateContact
);

module.exports = router;
