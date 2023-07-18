const express = require("express");
const { contacts: ctrl } = require("../../controllers/index");
const { userAuth } = require("../../middlewares");

const router = express.Router();

router.get("/", userAuth, ctrl.getContacts);

router.get("/:contactId", userAuth, ctrl.getContactById);

router.post("/", userAuth, ctrl.createContact);

router.delete("/:contactId", userAuth, ctrl.deleteContact);

router.put("/:contactId", userAuth, ctrl.updateContact);

router.patch("/:contactId/favorite", userAuth, ctrl.updateStatus);

module.exports = router;
