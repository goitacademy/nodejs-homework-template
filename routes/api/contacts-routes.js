const express = require("express");

const router = express.Router();

const  authenticate  = require("../../middlewares");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/contact");

const ctrl = require("../../controllers");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoritSchema),
  ctrl.updateStatusContact
);

module.exports = router;
