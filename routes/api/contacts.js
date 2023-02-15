const express = require("express");
const router = express.Router();

const { validationBody } = require("../middleware/validationBody");
const {
  addContactSchema,
  changeContactSchema,
} = require("../middleware/validationSchemas");
const { tryCatchWrapper } = require("../../helpers");
const contacts = require("../../controllers/contactController");



router.get("/", tryCatchWrapper(contacts.getAllContacts));

router.get("/:contactId", tryCatchWrapper(contacts.getOneContactById));

router.post(
  "/",
  validationBody(addContactSchema),
  tryCatchWrapper(contacts.addNewContact)
);

router.delete("/:contactId", tryCatchWrapper(contacts.deleteContactById));

router.put(
  "/:contactId",
  validationBody(changeContactSchema),
  tryCatchWrapper(contacts.updateSomeContact)
);

module.exports = router;
