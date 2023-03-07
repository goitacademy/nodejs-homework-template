const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/index");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContact);

router.post("/", validateBody(schemas.contactSchemaJoi), ctrl.contactAdd);

router.put(
  "/:contactId",
  validateBody(schemas.contactSchemaJoi),
  ctrl.updateContactById
);

router.delete("/:contactId", ctrl.deleteContact);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.contactSchemaFavorite),
  ctrl.updateStatusContact
);

module.exports = router;
