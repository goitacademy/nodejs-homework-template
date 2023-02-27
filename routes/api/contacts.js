// ----------------------------------------------------------------------------
//                         Router
// ----------------------------------------------------------------------------
const express = require("express");
const joi = require("joi");
const ctrl = require("../../controllers/contacts");
const { schema } = require("../../models/contact");

const { validateBody } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(schema.addSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(schema.favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
