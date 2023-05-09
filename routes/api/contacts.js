const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.postContact);

router.delete("/:contactId", isValidId, ctrl.deleteContactById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  ":contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteContactById
);

module.exports = router;
