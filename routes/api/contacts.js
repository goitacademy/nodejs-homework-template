const express = require("express");

const router = express.Router();

const ctrs = require("../../controllers/contacts");

const validateBody = require("../../middllwares/validateBody");

const isValidId = require("../../middllwares/isValidId");

const validateBodyFavorite = require("../../middllwares/validateBodyFavorite");

const { schemaContact, updateFavoriteSchema } = require("../../models/contact");

router.get("/", ctrs.getAll);

router.get("/:contactId", isValidId, ctrs.getById);

router.post("/", validateBody(schemaContact), ctrs.add);

router.delete("/:contactId", isValidId, ctrs.remove);

router.put("/:contactId", validateBody(schemaContact), ctrs.update);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyFavorite(updateFavoriteSchema),
  ctrs.updateStatusContact
);

module.exports = router;
