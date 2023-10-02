const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controller.js");
const isEmptyBody = require("../../middlewares/index.js");
const { validateBody } = require("../../decorators/index.js");
const contactSchema = require("../../schemas/contact-schema.js");

const contactValidate = validateBody(contactSchema);

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", isEmptyBody, contactValidate, contactsController.add);

router.put(
  "/:contactId",
  isEmptyBody,
  contactValidate,
  contactsController.updateById
);

router.delete("/:contactId", contactsController.deleteById);

module.exports = router;
