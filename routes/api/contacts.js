const express = require("express");

const router = express.Router();

const { contactsController } = require("../../controllers");

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", contactsController.addNewContact);

router.delete("/:contactId", contactsController.removeById);

router.put("/:contactId", contactsController.updateById);

module.exports = router;
