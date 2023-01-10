const express = require("express");
const { validation } = require("../../middelwares");
const { contactSchema } = require("../../shemas");

const ContactsController = require("../../controllers/ContactsController");

const validationMiddelware = validation(contactSchema);

const router = express.Router();

router.get("/", ContactsController.fetchAll);
router.get("/:contactId", ContactsController.fetchOne);
router.post("/", validationMiddelware, ContactsController.add);
router.delete("/:contactId", ContactsController.remove);
router.put("/:contactId", validationMiddelware, ContactsController.update);
router.patch("/:contactId/favorite", ContactsController.favorite);

module.exports = router;
