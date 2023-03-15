// ----------------------------------------------------------------------------
//                         Router  /api/contacts
// ----------------------------------------------------------------------------
const express = require("express");
const joi = require("joi");
const ctrl = require("../../controllers/contacts");
const { schema } = require("../../models/contact");
const { validateBody, authorization } = require("../../middlewares");

const router = express.Router();

router.get("/", authorization, ctrl.getAll);

router.get("/:contactId", authorization, ctrl.getContactById);

router.post(
  "/",
  authorization,
  validateBody(schema.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authorization, ctrl.removeContact);

router.put(
  "/:contactId",
  authorization,
  validateBody(schema.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(schema.favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
