const express = require("express");

const ctrlContact = require("../../controllers/contacts");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/contacts", authenticate, ctrlContact.get);

router.get("/contacts/:id", authenticate, ctrlContact.getById);

router.post(
  "/contacts",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlContact.create
);

router.put(
  "/contacts/:id",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrlContact.update
);

router.patch(
  "/contacts/:id/favorite",
  authenticate,
  ctrlContact.updateFavorite
);

router.delete("/contacts/:id", authenticate, ctrlContact.remove);

module.exports = router;
