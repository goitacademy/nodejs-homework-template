const express = require("express");
const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
  updateFavoriteStatus,
} = require("../controllers/contactsController");

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.delete("/:id", deleteContact);
router.put("/:id", updateContactById);
router.patch("/:id/favorite", updateFavoriteStatus);

module.exports = router;
