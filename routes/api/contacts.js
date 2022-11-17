const express = require("express");
const controllers = require("../../controllers/contacts");
const schema = require("../../schemas/contactSchema");
const { validationBody } = require("../../middlewares");
const { controllerlWrapper } = require("../../helpers/");
const router = express.Router();

router.get("/", controllerlWrapper(controllers.getAll));

router.get("/:contactId", controllerlWrapper(controllers.getContactById));

router.post("/", validationBody(schema.add), controllerlWrapper(controllers.addContact));

router.delete("/:contactId", controllerlWrapper(controllers.deleteContactById));

router.put("/:contactId", validationBody(schema.add), controllerlWrapper(controllers.updateContactById));

module.exports = router;
