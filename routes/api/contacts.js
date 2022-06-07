const express = require("express");
const contactController = require("../../controllers/contacts.controller");
const { catchHandler } = require("../../middleware/catchHandler");
const { checkContacRequest, validate } = require("../../middleware/validates");
const { contactShema } = require("../../shema/contact.shema");

const router = express.Router();

router.get(
  "/",
  catchHandler(contactController.getAllContacts.bind(contactController))
);

router.get(
  "/:contactId",
  catchHandler(contactController.getContactById.bind(contactController))
);

router.post(
  "/",
  [validate(contactShema)],
  catchHandler(contactController.createContact.bind(contactController))
);

router.delete(
  "/:contactId",
  catchHandler(contactController.deleteContact.bind(contactController))
);

router.put(
  "/:contactId",
  [checkContacRequest()],
  catchHandler(contactController.updateContact.bind(contactController))
);

module.exports = router;
