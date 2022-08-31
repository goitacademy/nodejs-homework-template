const express = require("express");

const { schemas } = require("../../models/Contact");

const { validation } = require("../../middlewares");

const { auth } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", auth, ctrl.listContacts);

router.get("/:id", auth, ctrl.getContactById);

router.post("/", auth, validation(schemas.add), ctrl.addContact);

router.patch(
  "/:id/favorite",
  auth,
  validation(schemas.updateFavorite),
  ctrl.updateFavoriteContacts
);

router.delete("/:id", auth, ctrl.removeContact);

router.put("/:id", auth, validation(schemas.add), ctrl.updateContact);

module.exports = router;
