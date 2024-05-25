const express = require("express");
const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
} = require("../controllers/contactsController");

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.delete("/:id", deleteContact);
router.put("/:id", updateContactById);

module.exports = router;
