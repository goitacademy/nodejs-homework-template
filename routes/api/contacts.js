const express = require("express");
const router = express.Router();
const {
	getAll,
	getContactById,
	addContact,
	removeContact,
	updateContact,
 } = require("../../controllers/contacts");


router.get("/", getAll);
router.get("/:contactId", getContactById);
router.post("/", addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId",updateContact);


module.exports = router;
// 