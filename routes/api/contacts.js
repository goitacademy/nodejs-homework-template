const express = require("express");
const router = express.Router();

const {
  deleteContact,
  postContact,
  putContact,
  getContact,
  getContacts,
} = require("../../controllers/contactsController");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares/index");
const { addContactsShema } = require("../../schemas/contacts");

router.get("/", tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(getContact));

router.post("/", validateBody(addContactsShema), tryCatchWrapper(postContact));

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validateBody(addContactsShema),
  tryCatchWrapper(putContact)
);

module.exports = router;
