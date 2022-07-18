const express = require("express");
const router = express.Router();
const { authenticate, isValidId } = require("../../middlewares");

const {
  addContact,
  getAllContact,
  getContactById,
  updateContactById,
  updateFavoriteContact,
  removeContact,
} = require("../../controllers");

router.get("/", authenticate, getAllContact);
router.get("/:contactId", authenticate, isValidId, getContactById);
router.post("/", authenticate, addContact);
router.put("/:contactId", authenticate, isValidId, updateContactById);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateFavoriteContact
);
router.delete("/:contactId", authenticate, isValidId, removeContact);

module.exports = router;
