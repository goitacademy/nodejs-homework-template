const express = require("express");
const controllers = require("../../controllers/contacts-controllers.js");
const isEmptyBody = require("../../middlewars/isEmptyBody.js");
const router = express.Router();
const isValidId = require("../../middlewars/isValidId.js");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post("/", isEmptyBody, controllers.addNewContact);

router.delete("/:contactId", isValidId, controllers.deleteById);

// router.put("/:contactId",isValidId, isEmptyBody, controllers.updateContact);

module.exports = router;
