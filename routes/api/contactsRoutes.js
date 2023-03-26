const express = require("express");
const {
  getContactById,
  listContacts,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers");

const {
  // checkContactId,
  checkCreateContactData,
  checkSameContact,
} = require("../../middlewares");

const router = express.Router();

router.get("/", listContacts);

router.post("/", checkCreateContactData, checkSameContact, addContact);

// router.use("/:contactId", checkContactId);
router.get("/:contactId", getContactById);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContact);

module.exports = router;
