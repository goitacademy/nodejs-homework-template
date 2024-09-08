const express = require("express");
const router = express.Router();
const authMiddleware  = require("../../middleware/jwt");
const { getListContacts, getThisContactById, addNewContact, updateThisContact, updateStatusContact, removeThisContact } = require("../../controllers/contacts");

router.get("/", authMiddleware, getListContacts);
router.get("/:contactId", authMiddleware, getThisContactById);
router.delete("/:contactId", authMiddleware, removeThisContact);
router.post("/", authMiddleware, addNewContact);
router.put("/:contactId", authMiddleware, updateThisContact);
router.patch("/:contactId", authMiddleware, updateStatusContact);

module.exports = router;