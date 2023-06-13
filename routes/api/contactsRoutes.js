const express = require("express");
const router = express.Router();

const ContactListController = require("./ContactsControllers");
const { authCheck } = require("../../middlewares/authHandler");

router.use(authCheck)

router.get("/", ContactListController.getAll);

router.get("/:contactId", ContactListController.getOneContactById);

router.post("/", ContactListController.addContact);

router.delete("/:contactId", ContactListController.deleteContactById);

router.put("/:contactId", ContactListController.updateContactById); 

router.patch("/:contactId/favorite", ContactListController.updateStatusContact)

module.exports = router;
