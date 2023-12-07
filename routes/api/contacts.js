const express = require("express");

const { contacts: controller } = require("../../controllers/index");
const { isValidId } = require("../../middlewares/index");

const router = express.Router();

router.get("/", controller.listContacts);

router.get("/:contactId", isValidId, controller.getContactById);

router.post("/", controller.addContact);

router.delete("/:contactId", isValidId, controller.removeContact);

router.patch("/:contactId/favorite", isValidId, controller.updateStatusContact);

router.put("/:contactId", isValidId, controller.updateContact);

module.exports = router;