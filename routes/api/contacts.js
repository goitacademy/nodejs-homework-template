const express = require("express");
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");
const router = express.Router();
const {
  getContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

router.get("/", tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(getOneContact));

router.post("/", tryCatchWrapper(createContact));

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put("/:contactId", tryCatchWrapper(updateContact));
router.patch("/:contactId/favorite", tryCatchWrapper(updateStatusContact));

module.exports = router;
