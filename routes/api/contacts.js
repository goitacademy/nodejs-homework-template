const express = require("express");
const schema = require("../../schema/schema");
const {
  validationBody,
  validationById,
  validationFavorite,
} = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", validationById, ctrl.getContactById);

router.get("/:contactId/favorite", validationById, ctrl.getByIdContactFavorite);

router.post("/", validationBody(schema.addSchema), ctrl.addContact);

router.delete("/:contactId", validationById, ctrl.removeContact);

router.put(
  "/:contactId",
  validationById,
  validationBody(schema.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validationById,
  validationFavorite(schema.addSchemaFavorite),
  ctrl.updateStatusContact
);

module.exports = router;
