const express = require("express");
const { contactValidation } = require("../../middlewares/validationMiddleware");
const router = express.Router();

const {
	getAllContacts,
	getOneContactById,
	postNewContact,
	removeContactById,
	changeContactById,
} = require("../../controllers/postControllers");

router.get("/", getAllContacts);

router.get("/:contactId", getOneContactById);

router.post("/", contactValidation, postNewContact);

router.delete("/:contactId", removeContactById);

router.put("/:contactId", contactValidation, changeContactById);

module.exports = router;
