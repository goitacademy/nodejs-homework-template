const express = require("express");

const isEmptyBody = require("../../middlewares")

const contactsController = require("../../controllers/contacts-controller")

const decorators = require("../../decorators")

const contactAddSchema = require("../../schemas/contact-schemas")

const contactAddValidate = decorators.validateBody(contactAddSchema);

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", isEmptyBody, contactAddValidate, contactsController.add);

router.delete("/:contactId",  contactsController.deleteById);

router.put("/:contactId", isEmptyBody, contactAddValidate, contactsController.updateById);

module.exports = router;
