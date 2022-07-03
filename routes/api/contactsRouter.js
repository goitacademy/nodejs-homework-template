const express = require("express");
const router = express.Router();
const { isValidId } = require("../../helpers");
const { authenticate } = require("../../helpers");

const {
  addContact,
  getAllContact,
  getContactById,
  updateContactById,
  updateFavoriteContact,
  removeContact,
} = require("../../controllers");

router.get("/", authenticate, getAllContact);
router.get("/:contactId", isValidId, getContactById);
router.post("/", addContact);
router.put("/:contactId", isValidId, updateContactById);
router.patch(
  "/:contactId/favorite",

  isValidId,
  updateFavoriteContact
);
router.delete("/:contactId", isValidId, removeContact);

module.exports = router;
