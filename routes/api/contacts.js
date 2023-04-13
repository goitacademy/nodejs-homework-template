const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");
const { authenticate } = require("../../middlewares");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate,  ctrl.getAllContacts);

router.get("/:id", authenticate,  ctrl.getContactById);

router.post("/", authenticate,  validateBody(schemas.addSchema), ctrl.addContact);

router.patch("/:id/favorite", authenticate,  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:id", authenticate,  ctrl.removeContact);

router.put("/:id", authenticate,  validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
