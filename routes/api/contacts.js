const express = require("express");

const controllers = require("../../controllers/contacts-controllers.js");
const isEmptyBody = require("../../middlewars/isEmptyBody.js");
const router = express.Router();

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", isEmptyBody, controllers.addNewContact);

router.delete("/:contactId", controllers.deleteById);

router.put("/:contactId", isEmptyBody, controllers.updateContact);

module.exports = router;
