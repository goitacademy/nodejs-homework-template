const express = require("express");
const contactController = require("../../controller/contacts.js");

const router = express.Router();

router.get("/", contactController.getAll);

router.get("/:contactId", contactController.getContactById);

router.post("/", contactController.addContact);

router.put("/:contactId", contactController.updateContact);

router.patch(
  "/:contactId/favorite",
  contactController.updateStatus
);

router.delete("/:contactId", contactController.remove);

module.exports = router;
