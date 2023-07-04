const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addNewContact,
  updateContactId,
  removeContactId,
} = require("../../controller/contact.controller");
const { validateContact } = require("../../middleware/validateContact");
const schema = require("../../schema/contactSchema");
const { contrWrapper } = require("../../helper/contrWrapper");

router.get("/", contrWrapper(getAll));
router.get("/:contactId", contrWrapper(getById));
router.post(
  "/",
  validateContact(schema.contactSchema),
  contrWrapper(addNewContact)
);
router.put(
  "/:contactId",
  validateContact(schema.contactSchema),
  contrWrapper(updateContactId)
);
router.delete("/:contactId", contrWrapper(removeContactId));
module.exports = router;
