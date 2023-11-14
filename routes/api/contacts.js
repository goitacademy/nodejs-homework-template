const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../midlewares/validateBody");
const checkRequestBody = require("../../midlewares/checkRequestBody");
const authenticate = require("../../midlewares/authenticate.js");

const { schemas } = require("../../models/contact");
const isValidId = require("../../midlewares/isValidId");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  checkRequestBody,
  validateBody(schemas.joiSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  checkRequestBody,
  isValidId,
  validateBody(schemas.joiSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
