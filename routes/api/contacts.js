const express = require("express");
const { validateSchema } = require("../../middlewares/SchemaValidator");
const contact = require("../../controller/contacts");
const {
  schemaCreateContact,
  schemaUpdateContact,
  updateFavoriteSchema,
} = require("../../service/schema/validationSchemas");

const router = express.Router();

router.get("/", contact.getContactsList);

router.get("/:contactId", contact.getById);

router.post("/", validateSchema(schemaCreateContact), contact.create);

router.delete("/:contactId", contact.removeContact);

router.put(
  "/:contactId",
  validateSchema(schemaUpdateContact),
  contact.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateSchema(updateFavoriteSchema),
  contact.updateStatus
);

module.exports = router;
