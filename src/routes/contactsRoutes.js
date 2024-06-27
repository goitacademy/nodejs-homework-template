const express = require("express");
const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
  updateFavoriteStatus,
} = require("../controllers/contactsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllContacts);
router.get("/:id", authMiddleware, getContactById);
router.post("/", authMiddleware, createContact);
router.delete("/:id", authMiddleware, deleteContact);
router.put("/:id", authMiddleware, updateContactById);
router.patch("/:id/favorite", authMiddleware, updateFavoriteStatus);

module.exports = router;
