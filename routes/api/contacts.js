const express = require("express");

const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../../controllers");

const {
  validateId,
  validateBody,
  validateFavorite,
  protect,
} = require("../../middlewares");

const router = express.Router();

router.use(protect);

router.get("/", getContacts);

router.get("/:contactId", validateId, getContactById);

router.post("/", validateBody(), addContact);

router.put("/:contactId", validateBody(), validateId, updateContact);

router.delete("/:contactId", validateId, removeContact);

router.patch(
  "/:contactId/favorite",

  validateId,
  validateFavorite(),
  updateStatusContact
);

module.exports = router;
