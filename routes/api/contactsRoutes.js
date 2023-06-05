const express = require("express");
const contactsController = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", contactsController.allContacts);

router.get("/:id", contactsController.oneContact);

router.post("/", contactsController.addOneContact);

router.delete("/:id", contactsController.deleteContact);

router.put("/:id", contactsController.updateById);

module.exports = router;
