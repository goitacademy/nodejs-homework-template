const express = require("express");
const schema = require("../../schemas/contacts");
const { validateBody, validationId } = require("../../middlewares/");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", validationId, ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.delete("/:contactId", validationId, ctrl.removeContact);

router.put(
  "/:contactId",
  validationId,
  validateBody(schema.addSchema),
  ctrl.updateContactById
);
router.patch(
  "/:contactId/favorite",
  validationId,
  validateBody(schema.schemaFavorite),
  ctrl.updateStatusContact
);
module.exports = router;
