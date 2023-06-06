const express = require("express");
const contactsController = require("../../controllers/contactsControllers");
const {validateBody} = require("../../decorators");
const schemas = require("../../schemas/contactSchema");
const router = express.Router();

router.get("/", contactsController.allContacts);

router.get("/:id", contactsController.oneContact);

router.post("/", validateBody(schemas.contactSchema), contactsController.addOneContact);

router.delete("/:id", validateBody(schemas.contactSchema),contactsController.deleteContact);

router.put("/:id", contactsController.updateById);

module.exports = router;
