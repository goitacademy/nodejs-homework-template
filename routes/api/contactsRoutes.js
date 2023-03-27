const express = require("express");
const {
  getContactById,
  listContacts,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

const {
  checkContactId,
  checkCreateContactData,
  checkSameContact,
  checkStatusContactBody,
} = require("../../middlewares");

const router = express.Router();

router.get("/", listContacts);

router.post("/", checkCreateContactData, checkSameContact, addContact);

router.use("/:contactId", checkContactId);
router.get("/:contactId", getContactById);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId", checkStatusContactBody, updateStatusContact);

module.exports = router;
