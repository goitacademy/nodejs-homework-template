const express = require("express");

const router = express.Router();

const { validationBody } = require("../../middlewares");

const schemas = require("../../schemas/contact");

const ctrls = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrls.listContacts));

router.get("/:contactId", ctrlWrapper(ctrls.getContactById));

router.post("/", validationBody(schemas.add), ctrlWrapper(ctrls.addContact));

router.put(
  "/:contactId",
  validationBody(schemas.add),
  ctrlWrapper(ctrls.updateContact)
);

router.delete("/:contactId", ctrlWrapper(ctrls.removeContact));

module.exports = router;
