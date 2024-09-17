const express = require("express");
const contactsController = require("../../controllers/contactsControllers");
const {validateBody} = require("../../decorators");
const schemas = require("../../schemas/contactSchema");
const {isBodyEmpty} = require("../../middlewares");
const router = express.Router();

router.get("/", contactsController.allContacts);

router.get("/:id", contactsController.oneContact);

router.post("/", isBodyEmpty, validateBody(schemas.contactSchema), contactsController.addOneContact);

router.delete("/:id",contactsController.deleteContact);

router.put("/:id", isBodyEmpty, validateBody(schemas.contactSchema), contactsController.updateById);

module.exports = router;
