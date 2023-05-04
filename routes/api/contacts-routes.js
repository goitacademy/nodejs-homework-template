const express = require("express");

const router = express.Router();

const  {authenticate}  = require("../../middlewares");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/contact");

const {ctrlC} = require("../../controllers");

router.get("/", authenticate, ctrlC.listContacts);

router.get("/:contactId", authenticate, ctrlC.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlC.addContact
);

router.delete("/:contactId", authenticate, ctrlC.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlC.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoritSchema),
  ctrlC.updateStatusContact
);

module.exports = router;
