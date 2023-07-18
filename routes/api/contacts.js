const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, authentificate } = require("../../middkewares/index");
const schemas = require("../../schemas/contacts");

router.get("/", authentificate, ctrl.getAll);

router.get("/:contactId", authentificate, ctrl.getById);

router.post(
  "/",
  authentificate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authentificate, ctrl.deletecontact);

router.put(
  "/:contactId",
  authentificate,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authentificate,
  validateBody(schemas.favoriteSchema),
  ctrl.updateFavorite
);
module.exports = router;
