const express = require("express");
const {
  getAllContacts,
  getContatcById,
  postContact,
  deleteContact,
  updateCFavorite,
  updateContactById,
} = require("../../controllers/contacts");
const router = express.Router();
const validateBody = require("../../midlewares/validateBody");
const validateBodyFavorite = require("../../midlewares/validateFavoriteBody");
const isValidId = require("../../midlewares/isValidId");
const authentificate = require("../../midlewares/authentificate");
const { shemas } = require("../../models/contact");

router.get("/", authentificate, getAllContacts);

router.get("/:contactId", authentificate, isValidId, getContatcById);

router.post("/", authentificate, validateBody(shemas.addSchema), postContact);
router.patch(
  "/:contactId/favorite",
  authentificate,
  isValidId,
  validateBodyFavorite(shemas.updateFavoriteSchema),
  updateCFavorite
);

router.delete("/:contactId", authentificate, isValidId, deleteContact);

router.put(
  "/:contactId",
  authentificate,
  isValidId,
  validateBody(shemas.addSchema),
  updateContactById
);

module.exports = router;
